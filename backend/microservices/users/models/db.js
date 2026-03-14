// models/db.js

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER || 'admin',
  password: process.env.PGPASSWORD || 'admin123',
  database: process.env.PGDATABASE || 'usersdb',
});

module.exports = pool;
