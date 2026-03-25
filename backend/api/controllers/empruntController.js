const empruntModel = require('../models/empruntModel');

exports.createEmprunt = async (request, reply) => {
  const { user_id, book_id } = request.body;
  try {
    const emprunt = await empruntModel.createEmprunt({ user_id, book_id });
    return reply.status(201).send(emprunt);
  } catch (e) {
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.listEmprunts = async (request, reply) => {
  try {
    const emprunts = await empruntModel.listEmprunts();
    return reply.send(emprunts);
  } catch (e) {
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.getRetards = async (request, reply) => {
  try {
    const retards = await empruntModel.getRetards();
    return reply.send(retards);
  } catch (e) {
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.getHistorique = async (request, reply) => {
  try {
    const historique = await empruntModel.getHistorique(parseInt(request.params.user_id, 10));
    return reply.send(historique);
  } catch (e) {
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.getEmprunt = async (request, reply) => {
  try {
    const emprunt = await empruntModel.getEmprunt(parseInt(request.params.id, 10));
    if (!emprunt) {
      return reply.status(404).send({ error: 'Emprunt non trouve.' });
    }
    return reply.send(emprunt);
  } catch (e) {
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.returnBook = async (request, reply) => {
  try {
    const emprunt = await empruntModel.returnBook(parseInt(request.params.id, 10));
    if (!emprunt) {
      return reply.status(404).send({ error: 'Emprunt non trouve.' });
    }
    return reply.send(emprunt);
  } catch (e) {
    return reply.status(500).send({ error: 'Erreur serveur.' });
  }
};
