const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
function client(name, imports, extra = {}) {
  const source = fs.readFileSync(path.join(__dirname, '../../frontend/src/lib', name + '.ts'), 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const storage = new Map();
  const context = { exports: {}, require: key => { if (!(key in imports)) throw new Error(key); return imports[key]; },
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    navigator: { onLine: true, userAgent: 'test' }, crypto: { randomUUID: () => 'test' },
    window: { location: { origin: 'http://test' } }, AbortController, URL, Blob, performance,
    setTimeout: (fn, ms) => { const t = setTimeout(fn, ms); t.unref(); return t; }, clearTimeout, ...extra };
  vm.runInNewContext(output, context);
  return context.exports;
}
const server = { apiOrigin: () => 'http://100.64.0.10:3033', isNative: false, getServer: () => null };
const imports = { react: {}, '@capacitor/app': {}, './server': server };
test('device retains logs on failed, missing or partial acknowledgments', async () => {
  for (const response of [{ ok: false }, { ok: true, json: async () => ({}) }, { ok: true, json: async () => ({ stored: 0 }) }]) {
    const api = client('deviceLog', imports, { fetch: async () => response });
    api.logEvent('error', 'offline');
    assert.equal(await api.uploadLogs(), false);
    assert.equal(api.pendingLogCount(), 1);
  }
});
test('repeats during upload are preserved and sent in the next batch', async () => {
  let finish;
  const batches = [];
  const api = client('deviceLog', imports, { fetch: async (_url, options) => {
    batches.push(JSON.parse(options.body).entries);
    if (batches.length === 1) await new Promise(resolve => { finish = resolve; });
    return { ok: true, json: async () => ({ stored: batches.at(-1).length }) };
  } });
  api.logEvent('error', 'offline');
  const pending = api.uploadLogs();
  await new Promise(resolve => setImmediate(resolve));
  api.logEvent('error', 'offline'); finish();
  assert.equal(await pending, true);
  assert.equal(batches.length, 2);
  assert.equal(batches[0][0].count, undefined);
  assert.equal(batches[1][0].count, 2);
  assert.equal(api.pendingLogCount(), 0);
});
test('queued logs survive reload and clear after acknowledgment', async () => {
  const storage = new Map();
  const localStorage = { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) };
  client('deviceLog', imports, { localStorage }).logEvent('warn', 'offline');
  const api = client('deviceLog', imports, { localStorage, fetch: async () => ({ ok: true, json: async () => ({ stored: 1 }) }) });
  assert.equal(api.pendingLogCount(), 1);
  assert.equal(await api.uploadLogs(), true);
  assert.equal(JSON.parse(storage.get('grocerypro.deviceLog')).length, 0);
});
test('foreign 503 differs from database outage; recovery notifies once', async () => {
  let data = { app: 'proxy', status: 'unavailable' }, status = 503, recovered = 0;
  const api = client('connection', {
    react: {}, '@capacitor/core': { Capacitor: {}, registerPlugin: () => ({}) }, './server': server,
    './appState': { appActive: () => false }, './priorityDataCache': { screenDataCache: { invalidate() {} } },
    './deviceLog': { timeoutSignal: () => undefined, logEvent() {}, uploadLogs: async () => true },
  }, { fetch: async () => ({ ok: status === 200, status, json: async () => data }), setTimeout: fn => setTimeout(fn, 0) });
  api.onConnectionRecovered(() => recovered++);
  await api.checkConnection(); assert.equal(api.connectionState().problem, 'wrong-server');
  data = { app: 'grocerypro', status: 'unavailable' };
  await api.checkConnection(); assert.equal(api.connectionState().problem, 'database-down');
  data = { app: 'grocerypro', status: 'ok' }; status = 200;
  await api.checkConnection(); assert.equal(api.connectionState().phase, 'ok'); assert.equal(recovered, 1);
});
test('failed disk storage cannot acknowledge device logs', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'grocerypro-log-test-'));
  process.env.LOG_DIR = path.join(root, 'logs');
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const { writeClientLogs, logRoot } = require('../src/services/Logger.ts');
  const batch = { device: 'test', entries: [{ time: new Date().toISOString(), event: 'test', level: 'warn' }] };
  assert.equal(writeClientLogs(batch, '127.0.0.1'), 1);
  assert.equal(fs.readFileSync(path.join(logRoot, fs.readdirSync(logRoot)[0]), 'utf8').trim().split('\n').length, 1);
  fs.rmSync(logRoot, { recursive: true }); fs.writeFileSync(logRoot, 'block directory creation');
  assert.throws(() => writeClientLogs(batch, '127.0.0.1'));
});
test('Android diagnosis distinguishes no internet, missing Tailscale, VPN off and unreachable server', async () => {
  const cases = [
    [{ online: false, vpn: false }, 'offline'],
    [{ online: true, vpn: false, tailscaleInstalled: false }, 'tailscale-missing'],
    [{ online: true, vpn: false, tailscaleInstalled: true }, 'tailscale-off'],
    [{ online: true, vpn: true, tailscaleInstalled: true, tailscaleIp: null }, 'other-vpn'],
    [{ online: true, vpn: true, tailscaleInstalled: true, tailscaleIp: '100.64.1.2' }, 'server-unreachable'],
  ];
  for (const [network, expected] of cases) {
    const api = client('connection', {
      react: {}, '@capacitor/core': { Capacitor: { isPluginAvailable: () => true }, registerPlugin: () => ({ getStatus: async () => network }) },
      './server': { ...server, isNative: true }, './appState': { appActive: () => false },
      './priorityDataCache': { screenDataCache: { invalidate() {} } },
      './deviceLog': { timeoutSignal: () => undefined, logEvent() {}, uploadLogs: async () => true },
    }, { fetch: async () => { throw new Error('unreachable'); }, setTimeout: fn => setTimeout(fn, 0) });
    await api.checkConnection(); assert.equal(api.connectionState().problem, expected);
  }
});
test('API timeout covers interrupted response bodies and reports connection failure', async () => {
  let reported = false;
  const api = client('api', {
    './server': server, './priorityDataCache': {}, './shoppingListCache': {},
    './connection': { reportRequest: ok => { reported = !ok; } }, './deviceLog': { logEvent() {} }, './profile': { readProfile: () => null },
  }, {
    setTimeout: fn => setTimeout(fn, 1),
    fetch: async (_url, options) => ({ text: () => new Promise((_resolve, reject) => options.signal.addEventListener('abort', () => reject(new Error('aborted')))) }),
  });
  await assert.rejects(api.api.get('/profiles'), error => error.network === true);
  assert.equal(reported, true);
});
test('health checks time out a stuck pool, share one query, then recover', async () => {
  const { databaseProbe } = require('../src/services/DatabaseHealth.ts');
  let calls = 0, finish;
  const check = databaseProbe(() => { calls++; return new Promise(resolve => { finish = resolve; }); }, 10);
  await Promise.all([assert.rejects(check(), /timed out/), assert.rejects(check(), /timed out/)]);
  await assert.rejects(check(), /timed out/);
  assert.equal(calls, 1);
  finish(); await new Promise(resolve => setImmediate(resolve));
  const next = check(); await new Promise(resolve => setImmediate(resolve)); finish(); await next;
  assert.equal(calls, 2);
});
