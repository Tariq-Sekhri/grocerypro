const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const config = JSON.parse(fs.readFileSync(path.join(root, '.geopro/database.json'), 'utf8').replace(/^\uFEFF/, ''));
process.env.DATABASE_URL = `mysql://root:${encodeURIComponent(config.password)}@127.0.0.1:3307/grocerypro?connect_timeout=10&pool_timeout=30&connection_limit=5`;
process.env.PORT = process.env.PORT || '3033';

// Auto rebuild: the API runs compiled code from dist. Sources newer than the
// last build are compiled before start, and edits while running are compiled
// while the current server keeps serving; a successful build then stops this
// process so the supervisor (boot supervisor or PM2) starts the new code.
// A failed build is logged and the running server is kept.
const { spawn } = require('node:child_process');
const backend = path.resolve(__dirname, '..');
const watched = [path.join(backend, 'src'), path.join(backend, 'prisma'), path.join(root, 'shared/constants')];
const stamp = path.join(backend, 'dist/.build-stamp');
const sourceFile = name => /\.(ts|js|cjs|mjs|json|prisma)$/.test(name);

function newestSource(dir) {
  let newest = 0;
  if (!fs.existsSync(dir)) return newest;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) newest = Math.max(newest, newestSource(file));
    else if (sourceFile(entry.name)) newest = Math.max(newest, fs.statSync(file).mtimeMs);
  }
  return newest;
}
const builtAt = () => fs.existsSync(stamp) ? fs.statSync(stamp).mtimeMs : 0;
const stale = () => !fs.existsSync(path.join(backend, 'dist/backend/src/app.js')) || Math.max(...watched.map(newestSource)) > builtAt();

function run(args) {
  return new Promise(resolve => {
    const child = spawn(process.execPath, args, { cwd: backend, stdio: 'inherit', windowsHide: true });
    child.on('exit', code => resolve(code === 0));
    child.on('error', () => resolve(false));
  });
}
async function build() {
  const started = Date.now();
  console.log('Building backend...');
  const ok = await run([require.resolve('typescript/bin/tsc', { paths: [backend] })]) && await run([path.join(__dirname, 'copy-prisma.cjs')]);
  if (ok) fs.writeFileSync(stamp, new Date().toISOString());
  console.log(ok ? `Backend built in ${Date.now() - started} ms.` : 'Backend build failed; keeping the current server.');
  return ok;
}

function watchSources() {
  let timer, building = false, again = false;
  const changed = (_event, name) => {
    if (name && !sourceFile(String(name))) return;
    clearTimeout(timer);
    timer = setTimeout(rebuild, 1500);
  };
  async function rebuild() {
    if (building) { again = true; return; }
    building = true;
    const ok = await build();
    building = false;
    if (again) { again = false; return rebuild(); }
    if (ok) {
      console.log('Restarting with the new build.');
      // Graceful stop (closes sockets and the database); the supervisor relaunches.
      process.emit('SIGTERM');
      setTimeout(() => process.exit(0), 10000).unref();
    }
  }
  for (const dir of watched) {
    if (!fs.existsSync(dir)) continue;
    try { fs.watch(dir, { recursive: true }, changed); }
    catch (error) { console.log(`Cannot watch ${dir}: ${error.message}`); }
  }
}
async function start() {
  const mysql = require('mysql2/promise');
  let attempts = 0;
  while (true) {
    let connection;
    try {
      connection = await mysql.createConnection({
        host: '127.0.0.1', port: 3307, user: 'root', password: config.password,
        database: 'grocerypro', connectTimeout: 5000,
      });
      await connection.query('SELECT 1');
      break;
    } catch (error) {
      if (attempts++ % 10 === 0) console.log(`Waiting for GroceryPro database (${error.code || 'unavailable'}).`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      connection?.destroy();
    }
  }
  if (stale()) await build();
  watchSources();
  console.log('GroceryPro database is ready; starting API.');
  require('../dist/backend/src/app.js');
}
void start().catch(error => { console.error(error); process.exitCode = 1; });
