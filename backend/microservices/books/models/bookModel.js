const pool = require('./db');

const createBook = async ({ titre, auteur, isbn, annee, editeur }) => {
  const result = await pool.query(
    'INSERT INTO books (titre, auteur, isbn, annee, editeur) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [titre, auteur, isbn, annee, editeur]
  );
  return result.rows[0];
};

const listBooks = async () => {
  const result = await pool.query('SELECT * FROM books ORDER BY id');
  return result.rows;
};

const getBook = async (id) => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  return result.rows[0];
};

const updateBook = async (id, { titre, auteur, isbn, annee, editeur }) => {
  const result = await pool.query(
    'UPDATE books SET titre = COALESCE($1, titre), auteur = COALESCE($2, auteur), isbn = COALESCE($3, isbn), annee = COALESCE($4, annee), editeur = COALESCE($5, editeur) WHERE id = $6 RETURNING *',
    [titre, auteur, isbn, annee, editeur, id]
  );
  return result.rows[0];
};

const deleteBook = async (id) => {
  await pool.query('DELETE FROM books WHERE id = $1', [id]);
};

const searchBooks = async (query) => {
  const { titre, auteur, isbn } = query;
  let sql = 'SELECT * FROM books WHERE 1=1';
  const params = [];
  if (titre) {
    sql += ' AND LOWER(titre) LIKE $' + (params.length + 1);
    params.push(`%${titre.toLowerCase()}%`);
  }
  if (auteur) {
    sql += ' AND LOWER(auteur) LIKE $' + (params.length + 1);
    params.push(`%${auteur.toLowerCase()}%`);
  }
  if (isbn) {
    sql += ' AND isbn = $' + (params.length + 1);
    params.push(isbn);
  }
  const result = await pool.query(sql, params);
  return result.rows;
};

module.exports = {
  createBook,
  listBooks,
  getBook,
  updateBook,
  deleteBook,
  searchBooks,
};
