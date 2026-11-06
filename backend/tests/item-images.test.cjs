const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

process.env.IMAGE_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), 'grocerypro-images-'));
const { imageExtension, saveItemImage, deleteItemImage, pruneItemImages, imageRoot } = require('../src/services/ItemImages.ts');

const png = Buffer.from('89504e470d0a1a0a0000000d49484452', 'hex');
const jpeg = Buffer.from('ffd8ffe000104a464946', 'hex');
const webp = Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WEBPVP8 ')]);

test('image type is judged by content', () => {
  assert.equal(imageExtension(png), 'png');
  assert.equal(imageExtension(jpeg), 'jpg');
  assert.equal(imageExtension(webp), 'webp');
  assert.equal(imageExtension(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"/>')), null);
});

test('saved names follow content; delete and prune stay inside the image folder', async t => {
  t.after(() => fs.rmSync(imageRoot, { recursive: true, force: true }));
  const first = await saveItemImage(7, png);
  assert.match(first, /^\/images\/items\/7-[0-9a-f]{16}\.png$/);
  assert.equal(await saveItemImage(7, png), first);
  const second = await saveItemImage(7, jpeg);
  assert.notEqual(second, first);
  assert.equal(await saveItemImage(7, Buffer.from('not an image')), null);

  const outside = path.join(path.dirname(imageRoot), 'grocerypro-keep.txt');
  fs.writeFileSync(outside, 'keep');
  t.after(() => fs.rmSync(outside, { force: true }));
  await deleteItemImage('/images/items/../grocerypro-keep.txt');
  assert.ok(fs.existsSync(outside));

  await deleteItemImage(first);
  assert.ok(!fs.existsSync(path.join(imageRoot, path.basename(first))));

  const orphan = await saveItemImage(8, webp);
  const old = new Date(Date.now() - 60 * 60 * 1000);
  for (const name of fs.readdirSync(imageRoot)) fs.utimesSync(path.join(imageRoot, name), old, old);
  const fresh = await saveItemImage(9, png);
  await pruneItemImages([second]);
  assert.deepEqual(fs.readdirSync(imageRoot).sort(), [path.basename(second), path.basename(fresh)].sort());
  assert.ok(!fs.existsSync(path.join(imageRoot, path.basename(orphan))));
});
