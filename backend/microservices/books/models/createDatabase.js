// models/createDatabase.js

require('dotenv').config();
const { Client } = require('pg');

const dbName = process.env.PGDATABASE || 'booksdb';

async function createDatabase() {
  // Connexion sans base cible pour pouvoir créer la base
  const client = new Client({
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: 'postgres',
  });
  await client.connect();
  const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Base de données ${dbName} créée.`);
  } else {
    console.log(`Base de données ${dbName} déjà existante.`);
  }
  await client.end();
}

createDatabase().catch(e => {
  console.error(e);
  process.exit(1);
});
