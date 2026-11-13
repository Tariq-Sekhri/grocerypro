const assert = require('node:assert/strict');
const { test } = require('node:test');
const { completeShoppingList } = require('../src/services/CompleteShoppingList.ts');

function database(statuses, completed_at = null) {
  const list = { shopping_list_id: 1, location_id: 7, completed_at, paid: false };
  const writes = [], created = [], copied = [];
  return { writes, created, copied, tx: {
    shopping_list: {
      findUniqueOrThrow: async () => list,
      update: async ({ data }) => { writes.push(data); return Object.assign(list, data); },
      create: async ({ data }) => { created.push(data); return { shopping_list_id: 2, ...data }; },
    },
    item_status: { findUnique: async ({ where }) => ({ status_id: 1, name: where.name }) },
    item_in_list: {
      findMany: async () => statuses.map((name, i) => ({ item_id: 10 + i, buyer_id: null, quantity: 1, discount_price: null, item_status: name ? { name } : null })),
      createMany: async ({ data }) => { copied.push(...data); return { count: data.length }; },
    },
  } };
}

test('empty, unfinished, missing-status and nothing-bought lists do not archive', async () => {
  for (const statuses of [[], ['in_cart', 'not_in_cart'], ['in_cart', null], ['not_found'], ['not_found', 'not_in_cart']]) {
    const db = database(statuses);
    assert.equal(await completeShoppingList(db.tx, 1), null);
    assert.equal(db.writes.length, 0);
  }
});

test('all purchased entries archive once with purchase time and paid flag', async () => {
  const db = database(['in_cart', 'in_cart']);
  const before = Date.now();
  const list = await completeShoppingList(db.tx, 1);
  assert.equal(list.paid, true);
  assert.ok(list.completed_at.getTime() >= before);
  const timestamp = list.completed_at;
  await completeShoppingList(db.tx, 1);
  assert.equal(db.writes.length, 1);
  assert.equal(list.completed_at, timestamp);
});

test('not-available entries archive with the trip and carry over to a new list', async () => {
  const db = database(['in_cart', 'not_found']);
  const list = await completeShoppingList(db.tx, 1);
  assert.ok(list.completed_at);
  assert.deepEqual(db.created, [{ location_id: 7 }]);
  assert.equal(db.copied.length, 1);
  assert.equal(db.copied[0].item_id, 11);
  assert.equal(db.copied[0].shopping_list_id, 2);
  assert.equal(db.copied[0].status_id, 1);
});

test('a fully bought list creates no carry-over list', async () => {
  const db = database(['in_cart']);
  await completeShoppingList(db.tx, 1);
  assert.equal(db.created.length, 0);
});
