require('dotenv').config();
const { initDb } = require('../models/initDb');
const pool = require('../models/db');

async function run() {
  try {
    await initDb();
    console.log('Tables initialisees avec succes.');
  } finally {
    await pool.end();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
