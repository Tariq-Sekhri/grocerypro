// Restarts the running API and waits until the new process is healthy.
//   npm run restart
// Under the GroceryPro Boot task (SYSTEM) it writes a restart request that the
// supervisor picks up; otherwise it restarts the PM2 app. The API builds any
// changed source before it starts (see run-pm2.cjs).
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');
const root = path.resolve(__dirname, '../..');
const runtime = path.join(root, '.geopro');
const port = process.env.PORT || '3033';
const health = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/health`, { signal: AbortSignal.timeout(3000) });
    return response.ok ? await response.json() : null;
  } catch { return null; }
};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const before = await health();
  if (fs.existsSync(path.join(runtime, 'boot-ready.json'))) {
    fs.writeFileSync(path.join(runtime, 'restart-backend'), new Date().toISOString());
    console.log('Asked the GroceryPro Boot supervisor to restart the API.');
  } else {
    execSync('pm2 restart grocerypro-backend', { stdio: 'inherit' });
  }
  const deadline = Date.now() + 180000;
  while (Date.now() < deadline) {
    await sleep(2000);
    const now = await health();
    if (now?.status === 'ok' && now.started && now.started !== before?.started) {
      console.log(`API restarted at ${now.started}; build ${now.build ?? 'unknown'}.`);
      return;
    }
  }
  const request = path.join(runtime, 'restart-backend');
  console.error(fs.existsSync(request)
    ? 'The supervisor did not pick up the request. It may be running an older run-boot.cjs; restart the GroceryPro Boot task once as admin.'
    : 'The API did not come back healthy within 3 minutes. Check .geopro/boot-backend.log.');
  process.exitCode = 1;
})();
