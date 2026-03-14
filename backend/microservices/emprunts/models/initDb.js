const pool = require('./db');

async function init() {
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
  console.log('Table emprunts créée ou déjà existante.');
  await pool.end();
}

init().catch(e => {
  console.error(e);
  process.exit(1);
});
