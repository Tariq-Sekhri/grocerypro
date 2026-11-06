const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('API waits through connection and query failures and closes readiness connections', async () => {
  const source = fs.readFileSync(path.join(__dirname, '../scripts/run-pm2.cjs'), 'utf8');
  let attempts = 0;
  let closed = 0;
  let queried = false;
  let started = false;
  let finish;
  const complete = new Promise(resolve => { finish = resolve; });
  const fakeProcess = { env: {}, exitCode: 0 };
  vm.runInNewContext(source, {
    __dirname: path.join(__dirname, '../scripts'),
    process: fakeProcess,
    console: { log() {}, error(error) { throw error; } },
    setTimeout(callback) { queueMicrotask(callback); },
    require(name) {
      if (name === 'node:fs') return { readFileSync: () => '{"password":"test:p"}' };
      if (name === 'node:path') return path;
      if (name === 'mysql2/promise') return {
        async createConnection() {
          assert.equal(started, false);
          if (++attempts === 1) throw Object.assign(new Error('not listening'), { code: 'ECONNREFUSED' });
          return {
            async query(sql) {
              assert.equal(sql, 'SELECT 1');
              if (attempts === 2) throw new Error('database not initialized');
              queried = true;
            },
            destroy() { closed++; },
          };
        },
      };
      if (name === '../dist/backend/src/app.js') {
        assert.equal(queried, true);
        assert.equal(closed, 2);
        started = true;
        finish();
        return {};
      }
      throw new Error(`Unexpected module ${name}`);
    },
  });
  await complete;
  assert.equal(attempts, 3);
  assert.equal(started, true);
  assert.match(fakeProcess.env.DATABASE_URL, /test%3Ap@127\.0\.0\.1:3307\/grocerypro\?/);
});
