// controllers/userController.js

const { USER_TYPES } = require('../schemas/userSchema');
const userModel = require('../models/userModel');

exports.createUser = async (request, reply) => {
  const { nom, email, type } = request.body;
  if (!nom || !email || !USER_TYPES.includes(type)) {
    return reply.status(400).send({ error: 'Champs invalides ou type non autorisé.' });
  }
  try {
    const user = await userModel.createUser({ nom, email, type });
    reply.status(201).send(user);
  } catch (e) {
    if (e.code === '23505') {
      reply.status(400).send({ error: 'Email déjà utilisé.' });
    } else {
      reply.status(500).send({ error: 'Erreur serveur.' });
    }
  }
};

exports.listUsers = async (request, reply) => {
  try {
    const users = await userModel.listUsers();
    console.log('Utilisateurs récupérés :', users);
    reply.send(users);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' + e.message });
  }
};

exports.getUser = async (request, reply) => {
  try {
    const user = await userModel.getUser(parseInt(request.params.id));
    if (!user) return reply.status(404).send({ error: 'Utilisateur non trouvé.' });
    reply.send(user);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' + e.message });
  }
};

exports.updateUser = async (request, reply) => {
  try {
    const user = await userModel.updateUser(parseInt(request.params.id), request.body);
    if (!user) return reply.status(404).send({ error: 'Utilisateur non trouvé.' });
    reply.send(user);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.deleteUser = async (request, reply) => {
  try {
    await userModel.deleteUser(parseInt(request.params.id));
    reply.status(204).send();
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};
