import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const types = { major: 'major', ma: 'major', minor: 'minor', mi: 'minor', patch: 'patch', p: 'patch' };
const type = types[process.argv[2]?.toLowerCase()];
if (!type) {
  console.error('Usage: bump <major|ma|minor|mi|patch|p>');
  process.exit(1);
}
const pkgPath = join(root, 'frontend/package.json');
const lockPath = join(root, 'frontend/package-lock.json');
const gradlePath = join(root, 'frontend/android/app/build.gradle');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
let gradle = readFileSync(gradlePath, 'utf8');

const oldVersion = pkg.version;
if (!/^\d+\.\d+\.\d+$/.test(oldVersion)) throw new Error(`Invalid semver: ${oldVersion}`);
const codeMatch = gradle.match(/versionCode (\d+)/);
if (!codeMatch || !/versionName "[^"]*"/.test(gradle)) throw new Error('versionCode/versionName not found in build.gradle');
const code = Number(codeMatch[1]);
if (!Number.isSafeInteger(code) || code < 1 || code >= 2100000000) throw new Error('Invalid Android versionCode');

let [major, minor, patch] = oldVersion.split('.').map(Number);
if (type === 'major') { major++; minor = 0; patch = 0; }
else if (type === 'minor') { minor++; patch = 0; }
else patch++;
const version = `${major}.${minor}.${patch}`;

pkg.version = lock.version = version;
lock.packages[''].version = version;
gradle = gradle.replace(/versionCode \d+/, `versionCode ${code + 1}`).replace(/versionName "[^"]*"/, `versionName "${version}"`);
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
writeFileSync(gradlePath, gradle);
console.log(`Bumped ${oldVersion} -> ${version} (${type})`);
console.log(`Android versionCode ${code} -> ${code + 1}`);
console.log('Run .\\mobile_build.ps1 to build this version.');
