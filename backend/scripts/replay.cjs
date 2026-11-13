// Replays what someone did in the app, step by step, from uploaded device logs.
//
//   npm run replay                                  list recent sessions
//   npm run replay -- --session <id>                every step of one session
//   npm run replay -- --who <profile|device|ip>     that person's latest session
//   npm run replay -- --who <name> --all             all of their sessions
//   options: --days 7  --problems (only dead taps, rage taps, errors, back presses)
//
// Times are this PC's local time from the device clock; +s is time since the
// previous step. Devices upload about once a minute while connected.
const fs = require('node:fs');
const path = require('node:path');
const args = process.argv.slice(2);
const option = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const flag = name => args.includes(name);
const days = Number(option('--days') || 7);
const root = path.resolve(process.env.LOG_DIR || path.join(__dirname, '../logs'));
const cutoff = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);

const entries = !fs.existsSync(root) ? [] : fs.readdirSync(root)
  .filter(name => /^client-\d{4}-\d{2}-\d{2}\.log$/.test(name) && name.slice(7, 17) >= cutoff)
  .sort()
  .flatMap(name => fs.readFileSync(path.join(root, name), 'utf8').split('\n').filter(Boolean).map(line => {
    try { return JSON.parse(line); } catch { return null; }
  }).filter(Boolean));

// Errors and connection changes have no session; attach them to the session
// that was running on that device at the time.
const sessions = new Map();
for (const e of entries) {
  if (!e.session) continue;
  const s = sessions.get(e.session) || { id: e.session, device: e.device, ip: e.ip, platform: e.platform, app: e.app, profile: '', steps: [], start: e.time, end: e.time };
  if (e.profile) s.profile = e.profile;
  if (e.time < s.start) s.start = e.time;
  if (e.time > s.end) s.end = e.time;
  s.steps.push(e);
  sessions.set(e.session, s);
}
for (const e of entries) {
  if (e.session) continue;
  const s = [...sessions.values()].find(s => s.device === e.device && e.time >= s.start && e.time <= s.end);
  if (s) s.steps.push(e);
}
for (const s of sessions.values()) s.steps.sort((a, b) => a.session && b.session ? a.t - b.t : String(a.time).localeCompare(String(b.time)));

const matches = (s, who) => [s.profile, s.device, s.ip].some(v => v && String(v).toLowerCase() === who.toLowerCase());
const time = t => new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + '.' + String(new Date(t).getMilliseconds()).padStart(3, '0');
const date = t => new Date(t).toLocaleString();
const list = [...sessions.values()].sort((a, b) => b.start.localeCompare(a.start));

const who = option('--who');
const sessionId = option('--session');
let chosen = sessionId ? list.filter(s => s.id.startsWith(sessionId)) : who ? list.filter(s => matches(s, who)) : [];
if (who && !flag('--all')) chosen = chosen.slice(0, 1);

if (!chosen.length) {
  if (sessionId || who) console.log(`No session found for ${sessionId || who} in the last ${days} days.\n`);
  console.log(`Sessions in the last ${days} days (newest first)`);
  if (!list.length) console.log('  none yet (devices upload about once a minute while connected)');
  for (const s of list.slice(0, 40)) {
    const actions = s.steps.filter(e => e.kind === 'activity' && ['tap', 'long-press', 'swipe', 'type', 'change', 'back-button'].includes(e.event)).length;
    const minutes = Math.round((new Date(s.end) - new Date(s.start)) / 60000);
    console.log(`  ${s.id}  ${date(s.start).padEnd(22)} ${String(minutes).padStart(3)} min  ${String(actions).padStart(4)} actions  ${(s.profile || '?').padEnd(10)} ${s.platform} ${s.app}  ${s.ip}`);
  }
  console.log('\nShow one: npm run replay -- --session <id>');
  process.exit(0);
}

const label = e => {
  const where = [e.dialog && `in "${e.dialog}"`, e.item && `on item "${e.item}"`].filter(Boolean).join(' ');
  const target = `"${e.target}"${e.disabled ? ' (disabled)' : ''}${where ? ' ' + where : ''}`;
  switch (e.event) {
    case 'tap': case 'long-press': return `${e.event.toUpperCase()} ${e.control ? '' : 'nothing tappable: '}${target}  @${e.x},${e.y}`;
    case 'swipe': return `SWIPE from ${target}  @${e.x},${e.y} by ${e.dx},${e.dy}`;
    case 'type': return `TYPE "${e.value}" into ${target}`;
    case 'change': return `SET ${target} = ${JSON.stringify(e.value)}`;
    case 'key': return `KEY ${e.key} in ${target}`;
    case 'scroll': return `scroll ${e.element} to ${e.top}/${Math.max(0, e.height - e.view)}`;
    case 'screen': return `SCREEN ${e.screen}${e.view ? ` [${e.view}]` : ''}${e.heading ? `  "${e.heading}"` : ''}`;
    case 'back-button': return `ANDROID BACK (${e.action})`;
    case 'app-hidden': return 'app left (home, lock or switched app)';
    case 'app-shown': return 'app returned';
    default: {
      const { time, level, event, seq, profile, device, app, platform, userAgent, ip, received, session, t, screen, kind, ...rest } = e;
      return `${level.toUpperCase()} ${event} ${JSON.stringify(rest)}`;
    }
  }
};

for (const s of chosen) {
  console.log(`Session ${s.id}  ${s.profile || '?'}  ${s.platform} ${s.app}  device ${s.device}  ip ${s.ip}`);
  console.log(`${date(s.start)} to ${date(s.end)}`);
  const sizes = [...new Set(s.steps.filter(e => e.vw).map(e => `${e.vw}x${e.vh}`))];
  if (sizes.length) console.log(`screen size ${sizes.join(', ')} (tap positions are in these CSS pixels)`);
  console.log('');
  let previous = null, screen = '';
  const recentTaps = [];
  for (const e of s.steps) {
    const notes = [];
    if (e.event === 'tap' && !e.control) notes.push('DEAD TAP');
    if (e.event === 'tap' && e.disabled) notes.push('DISABLED');
    if (e.event === 'tap') {
      while (recentTaps.length && e.t - recentTaps[0].t > 2000) recentTaps.shift();
      if (recentTaps.filter(r => r.element === e.element).length >= 2) notes.push('RAGE TAP');
      recentTaps.push(e);
    }
    if (e.level !== 'info') notes.push('PROBLEM');
    if (flag('--problems') && !notes.length && e.event !== 'back-button' && e.event !== 'screen') { previous = e; continue; }
    if (e.screen && e.screen !== screen && e.event !== 'screen') { console.log(`             on ${e.screen}`); }
    if (e.screen) screen = e.screen;
    const gap = previous && e.t !== undefined && previous.t !== undefined ? ((e.t - previous.t) / 1000).toFixed(1) : '';
    console.log(`${time(e.time)} ${(gap ? '+' + gap + 's' : '').padStart(8)}  ${label(e)}${notes.length ? '   <-- ' + notes.join(', ') : ''}`);
    previous = e;
  }
  console.log('');
}
