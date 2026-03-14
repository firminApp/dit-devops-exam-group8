const bookSchema = {
  type: 'object',
  required: ['titre', 'auteur', 'isbn'],
  properties: {
    titre: { type: 'string' },
    auteur: { type: 'string' },
    isbn: { type: 'string' },
    annee: { type: 'integer' },
    editeur: { type: 'string' }
  },
  additionalProperties: false
};

module.exports = { bookSchema };
