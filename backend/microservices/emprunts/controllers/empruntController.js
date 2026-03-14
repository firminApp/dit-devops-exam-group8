const { empruntSchema } = require('../schemas/empruntSchema');
const empruntModel = require('../models/empruntModel');

exports.createEmprunt = async (request, reply) => {
  const { user_id, book_id } = request.body;
  try {
    const emprunt = await empruntModel.createEmprunt({ user_id, book_id });
    reply.status(201).send(emprunt);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.listEmprunts = async (request, reply) => {
  try {
    const emprunts = await empruntModel.listEmprunts();
    reply.send(emprunts);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.getEmprunt = async (request, reply) => {
  try {
    const emprunt = await empruntModel.getEmprunt(parseInt(request.params.id));
    if (!emprunt) return reply.status(404).send({ error: 'Emprunt non trouvé.' });
    reply.send(emprunt);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.returnBook = async (request, reply) => {
  try {
    const emprunt = await empruntModel.returnBook(parseInt(request.params.id));
    if (!emprunt) return reply.status(404).send({ error: 'Emprunt non trouvé.' });
    reply.send(emprunt);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.getHistorique = async (request, reply) => {
  try {
    const historique = await empruntModel.getHistorique(parseInt(request.params.user_id));
    reply.send(historique);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.getRetards = async (request, reply) => {
  try {
    const retards = await empruntModel.getRetards();
    reply.send(retards);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};
