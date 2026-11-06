const assert = require('node:assert/strict');
const { test } = require('node:test');
const { completeShoppingList } = require('../src/services/CompleteShoppingList.ts');

function database(statuses, completed_at = null) {
  const list = { shopping_list_id: 1, completed_at, paid: false };
  const writes = [];
  return { writes, tx: {
    shopping_list: {
      findUniqueOrThrow: async () => list,
      update: async ({ data }) => { writes.push(data); return Object.assign(list, data); },
    },
    item_in_list: { findMany: async () => statuses.map(name => ({ item_status: name ? { name } : null })) },
  } };
}

test('empty, unfinished, missing-status and not-found entries do not archive', async () => {
  for (const statuses of [[], ['in_cart', 'not_in_cart'], ['in_cart', null], ['in_cart', 'not_found']]) {
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
