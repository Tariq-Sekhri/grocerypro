const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const config = JSON.parse(fs.readFileSync(path.join(root, '.geopro/database.json'), 'utf8').replace(/^\uFEFF/, ''));
process.env.DATABASE_URL = `mysql://root:${encodeURIComponent(config.password)}@127.0.0.1:3307/grocerypro?connect_timeout=10&pool_timeout=30&connection_limit=5`;
process.env.PORT = process.env.PORT || '3033';
async function start() {
  const mysql = require('mysql2/promise');
  let attempts = 0;
  while (true) {
    let connection;
    try {
      connection = await mysql.createConnection({
        host: '127.0.0.1', port: 3307, user: 'root', password: config.password,
        database: 'grocerypro', connectTimeout: 5000,
      });
      await connection.query('SELECT 1');
      break;
    } catch (error) {
      if (attempts++ % 10 === 0) console.log(`Waiting for GroceryPro database (${error.code || 'unavailable'}).`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      connection?.destroy();
    }
  }
  console.log('GroceryPro database is ready; starting API.');
  require('../dist/backend/src/app.js');
}
void start().catch(error => { console.error(error); process.exitCode = 1; });
