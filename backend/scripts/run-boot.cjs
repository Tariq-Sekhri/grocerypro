const fs = require('node:fs');
const path = require('node:path');
const net = require('node:net');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '../..');
const runtime = path.join(root, '.geopro');
const socket = '\\\\.\\pipe\\grocerypro-boot-supervisor';
const lock = net.createServer();
const children = new Map();
let stopping = false;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
if (process.argv.includes('--stop')) {
  const client = net.connect(socket, () => client.end('stop'));
  client.on('error', error => { console.error(error.code); process.exitCode = 1; });
} else {
  lock.on('connection', client => {
    client.once('data', data => {
      if (data.toString().trim() === 'stop') void stop();
      client.end();
    });
  });
}
function log(message) {
  fs.appendFileSync(path.join(runtime, 'boot-supervisor.log'), `${new Date().toISOString()} ${message}\n`);
}
function launch(name, script) {
  const output = fs.openSync(path.join(runtime, `boot-${name}.log`), 'a');
  const child = spawn(process.execPath, [path.join(__dirname, script)], {
    cwd: path.join(root, 'backend'), windowsHide: true,
    stdio: ['pipe', output, output, 'ipc'],
    env: { ...process.env, PORT: '3033', WEB_DEV: 'true' },
  });
  fs.closeSync(output);
  children.set(name, child);
  log(`${name} launched PID ${child.pid}`);
  child.on('error', error => log(`${name} spawn failed: ${error.code || error.message}`));
  child.on('exit', (code, signal) => {
    children.delete(name);
    log(`${name} exited: ${code ?? signal}`);
    if (!stopping) setTimeout(() => { if (!stopping) launch(name, script); }, 3000);
  });
}
async function stop() {
  if (stopping) return;
  stopping = true;
  log('Stopping boot supervisor');
  const api = children.get('backend');
  if (api?.connected) api.send('shutdown');
  await sleep(1500);
  const mysql = children.get('mysql');
  if (mysql?.connected) mysql.send('shutdown');
  const deadline = Date.now() + 15000;
  while (children.size && Date.now() < deadline) await sleep(200);
  for (const child of children.values()) child.kill();
  lock.close();
  process.exit(0);
}
lock.on('error', error => {
  if (error.code !== 'EADDRINUSE') log(`Supervisor lock failed: ${error.code}`);
  process.exit(error.code === 'EADDRINUSE' ? 0 : 1);
});
if (!process.argv.includes('--stop')) lock.listen(socket, async () => {
  log('Boot supervisor started');
  launch('mysql', 'run-mysql.cjs');
  launch('backend', 'run-pm2.cjs');
  let failures = 0;
  let reportedReady = false;
  while (!stopping) {
    await sleep(15000);
    if (stopping) break;
    try {
      const response = await fetch('http://127.0.0.1:3033/health', { signal: AbortSignal.timeout(10000) });
      const data = await response.json();
      if (!response.ok || data.app !== 'grocerypro' || data.status !== 'ok') throw new Error('not ready');
      if (failures || !reportedReady) log('API and database ready');
      reportedReady = true;
      failures = 0;
      fs.writeFileSync(path.join(runtime, 'boot-ready.json'), JSON.stringify({ ready: true, updated: new Date().toISOString() }));
    } catch {
      failures++;
      fs.writeFileSync(path.join(runtime, 'boot-ready.json'), JSON.stringify({ ready: false, updated: new Date().toISOString() }));
      if (failures === 1 || failures % 4 === 0) log(`API/database unavailable (${failures} checks)`);
      if (failures >= 4 && children.has('backend')) {
        log('Restarting unresponsive API; preserving MySQL');
        children.get('backend').kill();
        failures = 0;
      }
    }
  }
});
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
