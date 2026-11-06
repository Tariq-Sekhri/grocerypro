import 'dotenv/config';
import mysql from 'mysql2/promise';
import { execFileSync } from 'node:child_process';
import prisma from '../prisma/db';

async function setup() {
  const url = new URL(process.env.DATABASE_URL!);
  const database = url.pathname.slice(1);
  if (!/^[a-zA-Z0-9_]+$/.test(database)) throw new Error('Invalid database name');
  const connection = await mysql.createConnection({
    host: url.hostname, port: Number(url.port || 3306),
    user: decodeURIComponent(url.username), password: decodeURIComponent(url.password),
  });
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
  } finally {
    await connection.end();
  }
  execFileSync(process.execPath, ['node_modules/prisma/build/index.js', 'db', 'push', '--skip-generate'], { stdio: 'inherit' });
  for (const name of ['not_in_cart', 'in_cart', 'not_found']) {
    await prisma.item_status.upsert({ where: { name }, create: { name }, update: {} });
  }
  console.log('Database ready; existing records preserved.');
}
setup().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
