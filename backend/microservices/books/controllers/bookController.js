const { bookSchema } = require('../schemas/bookSchema');
const bookModel = require('../models/bookModel');

exports.createBook = async (request, reply) => {
  const { titre, auteur, isbn, annee, editeur } = request.body;
  try {
    const book = await bookModel.createBook({ titre, auteur, isbn, annee, editeur });
    reply.status(201).send(book);
  } catch (e) {
    if (e.code === '23505') {
      reply.status(400).send({ error: 'ISBN déjà utilisé.' });
    } else {
      reply.status(500).send({ error: 'Erreur serveur.' });
    }
  }
};

exports.listBooks = async (request, reply) => {
  try {
    const books = await bookModel.listBooks();
    reply.send(books);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.getBook = async (request, reply) => {
  try {
    const book = await bookModel.getBook(parseInt(request.params.id));
    if (!book) return reply.status(404).send({ error: 'Livre non trouvé.' });
    reply.send(book);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.updateBook = async (request, reply) => {
  try {
    const book = await bookModel.updateBook(parseInt(request.params.id), request.body);
    if (!book) return reply.status(404).send({ error: 'Livre non trouvé.' });
    reply.send(book);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.deleteBook = async (request, reply) => {
  try {
    await bookModel.deleteBook(parseInt(request.params.id));
    reply.status(204).send();
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};

exports.searchBooks = async (request, reply) => {
  try {
    const books = await bookModel.searchBooks(request.query);
    reply.send(books);
  } catch (e) {
    reply.status(500).send({ error: 'Erreur serveur.' });
  }
};
