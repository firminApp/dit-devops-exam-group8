// schemas/userSchema.js

const USER_TYPES = ['Etudiant', 'Professeur', 'Personnel administratif'];

const userSchema = {
  type: 'object',
  required: ['nom', 'email', 'type'],
  properties: {
    nom: { type: 'string' },
    email: { type: 'string', format: 'email' },
    type: { type: 'string', enum: USER_TYPES }
  },
  additionalProperties: false
};

module.exports = { userSchema, USER_TYPES };
