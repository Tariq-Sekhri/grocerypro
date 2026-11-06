const fs = require('node:fs');
const path = require('node:path');
const source = path.resolve(__dirname, '../../shared/prisma-types');
const target = path.resolve(__dirname, '../dist/shared/prisma-types');

// Copy file by file so a running backend's locked query engine does not fail
// the build when that engine is unchanged.
function copy(from, to) {
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name), dest = path.join(to, entry.name);
    if (entry.isDirectory()) { fs.mkdirSync(dest, { recursive: true }); copy(src, dest); continue; }
    try {
      fs.copyFileSync(src, dest);
    } catch (error) {
      const same = fs.existsSync(dest) && fs.statSync(dest).size === fs.statSync(src).size
        && fs.readFileSync(dest).equals(fs.readFileSync(src));
      if (!same) throw new Error(`Could not update ${dest}. Stop the backend (pm2 stop grocerypro-backend) and rebuild.`, { cause: error });
    }
  }
}
fs.mkdirSync(target, { recursive: true });
copy(source, target);
