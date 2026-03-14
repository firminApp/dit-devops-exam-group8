const { empruntSchema } = require('../schemas/empruntSchema');
const empruntController = require('../controllers/empruntController');

async function empruntRoutes(fastify, options) {
  fastify.post('/emprunts', { schema: { body: empruntSchema } }, empruntController.createEmprunt);
  fastify.get('/emprunts', empruntController.listEmprunts);
  fastify.get('/emprunts/retards', empruntController.getRetards);
  fastify.get('/emprunts/historique/:user_id', empruntController.getHistorique);
  fastify.get('/emprunts/:id', empruntController.getEmprunt);
  fastify.put('/emprunts/:id/retour', empruntController.returnBook);
}

module.exports = empruntRoutes;
