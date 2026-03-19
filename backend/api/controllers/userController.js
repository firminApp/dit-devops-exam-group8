const { USER_TYPES } = require('../schemas/userSchema');
const userModel = require('../models/userModel');

exports.createUser = async (request, reply) => {
  const { nom, email, type } = request.body;
  if (!nom || !email || !USER_TYPES.includes(type)) {
    return reply.status(400).send({ error: 'Champs invalides ou type non autorise.' });
  }

  try {
    const user = await userModel.createUser({ nom, email, type });
    return reply.status(201).send(user);
  } catch (e) {
    if (e.code === '23505') {
      return reply.status(400).send({ error: 'Email deja utilise.' });
    }
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.listUsers = async (request, reply) => {
  try {
    const users = await userModel.listUsers();
    return reply.send(users);
  } catch (e) {
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.getUser = async (request, reply) => {
  try {
    const user = await userModel.getUser(parseInt(request.params.id, 10));
    if (!user) {
      return reply.status(404).send({ error: 'Utilisateur non trouve.' });
    }
    return reply.send(user);
  } catch (e) {
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.updateUser = async (request, reply) => {
  try {
    const user = await userModel.updateUser(parseInt(request.params.id, 10), request.body);
    if (!user) {
      return reply.status(404).send({ error: 'Utilisateur non trouve.' });
    }
    return reply.send(user);
  } catch (e) {
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.deleteUser = async (request, reply) => {
  try {
    await userModel.deleteUser(parseInt(request.params.id, 10));
    return reply.status(204).send();
  } catch (e) {
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};
