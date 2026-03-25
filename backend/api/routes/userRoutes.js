const { userSchema } = require('../schemas/userSchema');
const userController = require('../controllers/userController');

async function userRoutes(fastify) {
  fastify.post('/users', { schema: { body: userSchema } }, userController.createUser);
  fastify.get('/users', userController.listUsers);
  fastify.get('/users/:id', userController.getUser);
  fastify.put('/users/:id', userController.updateUser);
  fastify.delete('/users/:id', userController.deleteUser);
}

module.exports = userRoutes;
