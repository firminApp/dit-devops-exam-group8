const { bookSchema } = require('../schemas/bookSchema');
const bookController = require('../controllers/bookController');

async function bookRoutes(fastify, options) {
  fastify.post('/books', { schema: { body: bookSchema } }, bookController.createBook);
  fastify.get('/books', bookController.listBooks);
  fastify.get('/books/search', bookController.searchBooks);
  fastify.get('/books/:id', bookController.getBook);
  fastify.put('/books/:id', bookController.updateBook);
  fastify.delete('/books/:id', bookController.deleteBook);
}

module.exports = bookRoutes;
