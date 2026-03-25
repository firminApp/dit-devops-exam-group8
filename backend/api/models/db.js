const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || 'admin',
  password: process.env.PGPASSWORD || 'admin123',
  database: process.env.PGDATABASE || 'librarydb',
});

module.exports = pool;
