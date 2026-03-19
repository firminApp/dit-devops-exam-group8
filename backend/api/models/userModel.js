const pool = require('./db');

const createUser = async ({ nom, email, type }) => {
  const result = await pool.query(
    'INSERT INTO users (nom, email, type) VALUES ($1, $2, $3) RETURNING *',
    [nom, email, type]
  );
  return result.rows[0];
};

const listUsers = async () => {
  const result = await pool.query('SELECT * FROM users ORDER BY id');
  return result.rows;
};

const getUser = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const updateUser = async (id, { nom, email, type }) => {
  const result = await pool.query(
    'UPDATE users SET nom = COALESCE($1, nom), email = COALESCE($2, email), type = COALESCE($3, type) WHERE id = $4 RETURNING *',
    [nom, email, type, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = {
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
};
