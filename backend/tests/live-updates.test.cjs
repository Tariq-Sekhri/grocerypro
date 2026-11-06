const assert = require('node:assert/strict');
const { test } = require('node:test');
const { once } = require('node:events');
const { createServer } = require('node:http');
const express = require('express');
const { io } = require('../../frontend/node_modules/socket.io-client');
const { createLiveUpdates } = require('../src/services/LiveUpdates.ts');

test('committed writes notify both clients; reads and failed writes stay quiet', { timeout: 5000 }, async t => {
  const app = express();
  const server = createServer(app);
  const live = createLiveUpdates(server);
  let value = 0;
  app.use(live.notifyAfterWrite);
  app.get('/value', (_req, res) => res.json({ value }));
  for (const method of ['post', 'put', 'patch', 'delete']) {
    app[method]('/value', (_req, res) => { value++; res.sendStatus(method === 'delete' ? 204 : 200); });
  }
  app.patch('/rejected', (_req, res) => res.sendStatus(400));
  app.post('/failed', (_req, res) => res.sendStatus(500));
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  const clients = [io(base + '/grocery-sync', { transports: ['websocket'] }), io(base + '/grocery-sync', { transports: ['websocket'] })];
  t.after(() => { clients.forEach(client => client.disconnect()); live.io.close(); });
  await Promise.all(clients.map(client => once(client, 'connect')));
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
    const received = clients.map(client => once(client, 'changed'));
    const start = performance.now();
    assert.ok((await fetch(base + '/value', { method })).ok);
    await Promise.all(received);
    assert.equal((await (await fetch(base + '/value')).json()).value, value);
    assert.ok(performance.now() - start < 1000, 'notification and fresh read should take less than one second locally');
  }
  let unexpected = 0;
  clients.forEach(client => client.on('changed', () => unexpected++));
  await fetch(base + '/value');
  await fetch(base + '/rejected', { method: 'PATCH' });
  await fetch(base + '/failed', { method: 'POST' });
  await new Promise(resolve => setTimeout(resolve, 100));
  assert.equal(unexpected, 0);

  // A client that missed an event must be able to read the latest committed value on reconnect.
  clients[1].disconnect();
  const updated = once(clients[0], 'changed');
  await fetch(base + '/value', { method: 'PATCH' });
  await updated;
  clients[1].connect();
  await once(clients[1], 'connect');
  assert.equal((await (await fetch(base + '/value')).json()).value, 5);
});
