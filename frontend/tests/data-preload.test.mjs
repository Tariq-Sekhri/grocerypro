import assert from 'node:assert/strict';
import { setImmediate } from 'node:timers';
import { test } from 'node:test';
import { PriorityDataCache } from '../src/lib/priorityDataCache.ts';
import { shoppingListCacheKey, readShoppingListCache, writeShoppingListCache } from '../src/lib/shoppingListCache.ts';

const tick = () => new Promise(resolve => setImmediate(resolve));

test('viewport reads are limited; hover promotes queued work and navigation shares it', async () => {
  const cache = new PriorityDataCache();
  const started = [], finish = new Map();
  const load = key => priority => new Promise(resolve => {
    started.push([key, priority]); finish.set(key, resolve);
  });
  const first = cache.read('first', 'viewport', load('first'));
  const second = cache.read('second', 'viewport', load('second'));
  const third = cache.read('third', 'viewport', load('third'));
  await tick();
  assert.deepEqual(started, [['first', 'viewport']]);
  const hover = cache.read('third', 'hover', load('duplicate'));
  const click = cache.read('third', 'navigation', load('duplicate'), true);
  assert.equal(third, hover);
  assert.equal(third, click);
  await tick();
  assert.deepEqual(started, [['first', 'viewport'], ['third', 'navigation']]);
  finish.get('third')({ name: 'preloaded' });
  assert.deepEqual(await click, { name: 'preloaded' });
  assert.deepEqual(cache.peek('third'), { name: 'preloaded' });
  finish.get('first')([]);
  await first; await tick();
  assert.deepEqual(started[2], ['second', 'viewport']);
  finish.get('second')([]);
  await second;
});

test('mutation invalidation prevents reuse of stale in-flight data', async () => {
  const cache = new PriorityDataCache();
  let finish;
  const pending = cache.read('list', 'viewport', () => new Promise(resolve => { finish = resolve; }));
  const queued = cache.read('queued', 'viewport', async () => 'queued');
  const rejected = assert.rejects(queued, /invalidated/);
  await tick(); cache.invalidate();
  await rejected;
  finish('old'); await pending;
  assert.equal(cache.peek('list'), null);
  assert.equal(await cache.read('list', 'navigation', async () => 'server'), 'server');
  cache.invalidate();
  assert.equal(cache.peek('list'), null);
});

test('expired preloads and failed requests fetch again', async () => {
  const cache = new PriorityDataCache();
  const now = Date.now;
  try {
    Date.now = () => 100;
    await cache.read('data', 'hover', async () => 'old');
    Date.now = () => 6000;
    assert.equal(cache.peek('data'), null);
    assert.equal(await cache.read('data', 'hover', async () => 'new'), 'new');
  } finally { Date.now = now; }
  await assert.rejects(cache.read('failure', 'hover', async () => { throw Error('offline'); }));
  assert.equal(await cache.read('failure', 'navigation', async () => 'online'), 'online');
});

test('locations, list names and items persist separately per server/store', () => {
  const values = new Map();
  globalThis.localStorage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const key = path => shoppingListCacheKey('http://server-a', path);
  const locations = [{ location_id: 1, name: 'Food Basics', address: '2425 Truscott Drive' }];
  writeShoppingListCache(key('/locations'), locations);
  assert.deepEqual(readShoppingListCache(key('/locations')), locations);
  assert.deepEqual(readShoppingListCache(key('/locations/1')), locations[0]);
  assert.equal(readShoppingListCache(shoppingListCacheKey('http://server-b', '/locations')), null);
  writeShoppingListCache(key('/locations/1'), { ...locations[0], name: 'Server name' });
  assert.equal(readShoppingListCache(key('/locations/1')).name, 'Server name');
  const list = key('/shoppingList/active?location_id=1');
  writeShoppingListCache(list, [{ item_in_list_id: 4, item_name: 'Milk' }]);
  assert.equal(readShoppingListCache(list)[0].item_name, 'Milk');
  writeShoppingListCache(list, []);
  assert.deepEqual(readShoppingListCache(list), []);
  writeShoppingListCache(key('/locations'), []);
  assert.deepEqual(readShoppingListCache(key('/locations')), []);
  values.set(list, '{bad');
  assert.equal(readShoppingListCache(list), null);
  globalThis.localStorage = { getItem() { throw Error('blocked'); }, setItem() { throw Error('full'); } };
  assert.equal(readShoppingListCache(list), null);
  assert.doesNotThrow(() => writeShoppingListCache(list, []));
});
