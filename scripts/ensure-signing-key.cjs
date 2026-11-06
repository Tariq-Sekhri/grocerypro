// Creates GroceryPro's release signing key on first use. The key and its
// passwords live in the ignored .geopro/signing folder; back that folder up,
// because every future Play Store release must be signed with the same key.
// frontend/android/app/build.gradle reads keystore.properties from there.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const signingDir = path.join(root, '.geopro', 'signing');
const propertiesPath = path.join(signingDir, 'keystore.properties');
const keyPath = path.join(signingDir, 'grocerypro-release.jks');
fs.mkdirSync(signingDir, { recursive: true });
if (fs.existsSync(propertiesPath)) {
  console.log('Using release signing key from .geopro/signing.');
  return;
}
if (fs.existsSync(keyPath)) throw new Error('Signing key exists but its properties are missing. Restore .geopro/signing/keystore.properties.');
const password = crypto.randomBytes(32).toString('hex');
const keytool = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', 'keytool.exe') : 'keytool';
const result = spawnSync(keytool, ['-genkeypair', '-noprompt', '-storetype', 'JKS', '-keystore', keyPath,
  '-alias', 'grocerypro', '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000',
  '-storepass:env', 'GROCERYPRO_KEY_PASSWORD', '-keypass:env', 'GROCERYPRO_KEY_PASSWORD',
  '-dname', 'CN=GroceryPro'], { stdio: 'inherit', env: { ...process.env, GROCERYPRO_KEY_PASSWORD: password } });
if (result.error || result.status !== 0) throw new Error('Could not generate GroceryPro release signing key.', { cause: result.error });
fs.writeFileSync(propertiesPath, `storeFile=${keyPath.replaceAll('\\', '/')}\nstorePassword=${password}\nkeyAlias=grocerypro\nkeyPassword=${password}\n`);
console.log('Created release signing key in .geopro/signing. Back up this folder for future releases.');
