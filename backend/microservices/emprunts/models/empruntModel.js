const pool = require('./db');

const createEmprunt = async ({ user_id, book_id }) => {
  const result = await pool.query(
    'INSERT INTO emprunts (user_id, book_id) VALUES ($1, $2) RETURNING *',
    [user_id, book_id]
  );
  return result.rows[0];
};

const listEmprunts = async () => {
  const result = await pool.query('SELECT * FROM emprunts ORDER BY id');
  return result.rows;
};

const getEmprunt = async (id) => {
  const result = await pool.query('SELECT * FROM emprunts WHERE id = $1', [id]);
  return result.rows[0];
};

const returnBook = async (id) => {
  const result = await pool.query(
    'UPDATE emprunts SET rendu = TRUE, date_retour = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

const getHistorique = async (user_id) => {
  const result = await pool.query('SELECT * FROM emprunts WHERE user_id = $1 ORDER BY date_emprunt DESC', [user_id]);
  return result.rows;
};

const getRetards = async () => {
  // Suppose un retard si non rendu et date_emprunt > 14 jours
  const result = await pool.query(
    `SELECT * FROM emprunts WHERE rendu = FALSE AND date_emprunt < NOW() - INTERVAL '14 days'`
  );
  return result.rows;
};

module.exports = {
  createEmprunt,
  listEmprunts,
  getEmprunt,
  returnBook,
  getHistorique,
  getRetards,
};
