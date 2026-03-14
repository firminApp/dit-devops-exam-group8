const pool = require('./db');

async function init() {
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
  console.log('Table books créée ou déjà existante.');
  await pool.end();
}

init().catch(e => {
  console.error(e);
  process.exit(1);
});
