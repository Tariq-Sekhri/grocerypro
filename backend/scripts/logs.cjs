// Summarizes GroceryPro logs: when each device last reached the server, and
// recent problems from both the server and devices.
// Usage: npm run logs [-- --days 7] [-- --device <id or ip>]
const fs = require('node:fs');
const path = require('node:path');
const args = process.argv.slice(2);
const option = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const days = Number(option('--days') || 7);
const deviceFilter = option('--device');
const root = path.resolve(process.env.LOG_DIR || path.join(__dirname, '../logs'));
const cutoff = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);

function read(kind) {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root)
    .filter(name => name.startsWith(kind + '-') && name.slice(kind.length + 1, kind.length + 11) >= cutoff)
    .sort()
    .flatMap(name => fs.readFileSync(path.join(root, name), 'utf8').split('\n').filter(Boolean).map(line => {
      try { return JSON.parse(line); } catch { return null; }
    }).filter(Boolean));
}
const local = time => time ? new Date(time).toLocaleString() : '-';
const server = read('server');
const client = read('client').filter(e => !deviceFilter || e.device === deviceFilter || e.ip === deviceFilter);

console.log(`Logs in ${root}, last ${days} days\n`);
const devices = new Map();
for (const e of client) {
  const d = devices.get(e.device) || { ip: e.ip, app: e.app, platform: e.platform, lastUpload: '', lastOk: '', problems: 0, profile: '' };
  d.ip = e.ip; d.app = e.app || d.app; d.platform = e.platform || d.platform;
  if (e.received > d.lastUpload) d.lastUpload = e.received;
  if (e.event === 'connection' && e.state === 'ok' && e.time > d.lastOk) d.lastOk = e.time;
  if (e.profile) d.profile = e.profile;
  if (e.level === 'error' || e.level === 'warn') d.problems++;
  devices.set(e.device, d);
}
const lastSocket = new Map();
for (const e of server) if (e.event === 'device-connected' || e.event === 'request') lastSocket.set(e.ip, e.time);

console.log('Devices (from uploaded device logs)');
if (!devices.size) console.log('  none yet');
for (const [id, d] of devices) {
  console.log(`  ${id}  ${d.profile || '?'}  ${d.platform} ${d.app}  ip ${d.ip}\n    last upload ${local(d.lastUpload)}  last connected ${local(d.lastOk)}  problems ${d.problems}`);
}
console.log('\nAddresses seen by the server (live connection or write)');
for (const [ip, time] of [...lastSocket].sort((a, b) => b[1].localeCompare(a[1]))) console.log(`  ${ip.padEnd(16)} ${local(time)}`);

const problems = [
  ...server.filter(e => e.level !== 'info').map(e => ({ ...e, source: 'server' })),
  ...client.filter(e => e.level !== 'info').map(e => ({ ...e, source: e.profile || e.device })),
].sort((a, b) => String(a.time).localeCompare(String(b.time))).slice(-40);
console.log('\nRecent problems');
if (!problems.length) console.log('  none');
for (const e of problems) {
  const { time, level, event, source, received, device, ip, app, platform, userAgent, ...rest } = e;
  console.log(`  ${local(time)}  ${level.padEnd(5)} ${String(source).padEnd(12)} ${event}  ${JSON.stringify(rest)}`);
}
