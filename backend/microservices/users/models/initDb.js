// models/initDb.js

const pool = require('./db');

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      type VARCHAR(50) NOT NULL
    );
  `);
  console.log('Table users créée ou déjà existante.');
  await pool.end();
}

init().catch(e => {
  console.error(e);
  process.exit(1);
});
