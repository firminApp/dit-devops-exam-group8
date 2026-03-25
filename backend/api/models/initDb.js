const pool = require('./db');
const { Client } = require('pg');

async function ensureDatabaseExists() {
  const databaseName = process.env.PGDATABASE || 'librarydb';
  const client = new Client({
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || 'admin',
    password: process.env.PGPASSWORD || 'admin123',
    database: 'postgres',
  });

  await client.connect();
  try {
    const result = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [databaseName]);
    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${databaseName}"`);
    }
  } finally {
    await client.end();
  }
}

async function initDb() {
  await ensureDatabaseExists();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      type VARCHAR(50) NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      titre VARCHAR(255) NOT NULL,
      auteur VARCHAR(255) NOT NULL,
      isbn VARCHAR(20) UNIQUE NOT NULL,
      annee INT,
      editeur VARCHAR(255)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS emprunts (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      book_id INT NOT NULL,
      date_emprunt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      date_retour TIMESTAMP,
      rendu BOOLEAN DEFAULT FALSE,
      CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
      CONSTRAINT fk_book FOREIGN KEY(book_id) REFERENCES books(id)
    );
  `);
}

module.exports = { initDb };
