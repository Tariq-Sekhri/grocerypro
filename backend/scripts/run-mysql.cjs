const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const root = path.resolve(__dirname, '../..');
const runtime = path.join(root, '.geopro');
const dataDir = path.join(runtime, 'mysql');
if (!fs.existsSync(path.join(dataDir, 'mysql'))) {
  throw new Error('Initialize the GroceryPro database with start geopro.ps1 first.');
}
const installRoot = path.join(process.env.ProgramFiles || 'C:/Program Files', 'MySQL');
const executable = process.env.GEOPRO_MYSQL_EXE || fs.readdirSync(installRoot)
  .map(folder => path.join(installRoot, folder, 'bin/mysqld.exe'))
  .find(file => fs.existsSync(file));
if (!executable) throw new Error('MySQL Server binaries were not found.');

const args = ['--no-defaults', `--datadir=${dataDir}`, '--port=3307',
  '--bind-address=127.0.0.1', '--mysqlx=0', '--console'];
const initFile = path.join(runtime, 'mysql-init.sql');
if (fs.existsSync(initFile)) args.push(`--init-file=${initFile}`);
const child = spawn(executable, args, { windowsHide: true, stdio: ['ignore', 'inherit', 'inherit'] });
child.on('error', error => { console.error(error); process.exit(1); });
let stopping = false;
child.on('exit', (code, signal) => {
  if (!stopping) console.error(`GroceryPro MySQL exited (${code ?? signal}); PM2 will restart it.`);
  process.exit(stopping ? 0 : (code || 1));
});

async function stop() {
  if (stopping) return;
  stopping = true;
  const timeout = setTimeout(() => child.kill(), 10000);
  timeout.unref();
  let connection;
  try {
    const config = JSON.parse(fs.readFileSync(path.join(runtime, 'database.json'), 'utf8').replace(/^\uFEFF/, ''));
    connection = await require('mysql2/promise').createConnection({
      host: '127.0.0.1', port: 3307, user: 'root', password: config.password, connectTimeout: 5000,
    });
    await connection.query('SHUTDOWN');
  } catch (error) {
    console.error(`Could not shut down GroceryPro MySQL gracefully: ${error.code || error.message}`);
    child.kill();
  } finally {
    connection?.destroy();
  }
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
process.on('message', message => { if (message === 'shutdown') void stop(); });
