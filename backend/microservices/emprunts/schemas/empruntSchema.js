const empruntSchema = {
  type: 'object',
  required: ['user_id', 'book_id'],
  properties: {
    user_id: { type: 'integer' },
    book_id: { type: 'integer' },
    date_emprunt: { type: 'string', format: 'date-time' },
    date_retour: { type: 'string', format: 'date-time' },
    rendu: { type: 'boolean' }
  },
  additionalProperties: false
};

module.exports = { empruntSchema };
