require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const fastifyHttpProxy = require('@fastify/http-proxy');

const PORT = process.env.PORT || 3000;

fastify.register(fastifyCors, { origin: '*' });

// Proxy vers users
fastify.register(fastifyHttpProxy, {
  upstream: process.env.USERS_URL,
  prefix: '/users',
  rewritePrefix: '/users',
});

// Proxy vers books
fastify.register(fastifyHttpProxy, {
  upstream: process.env.BOOKS_URL,
  prefix: '/books',
  rewritePrefix: '/books',
});

// Proxy vers emprunts
fastify.register(fastifyHttpProxy, {
  upstream: process.env.EMPRUNTS_URL,
  prefix: '/emprunts',
  rewritePrefix: '/emprunts',
});

// Route pour centraliser les liens vers les docs Swagger de chaque microservice
fastify.get('/docs', async (request, reply) => {
  reply.type('text/html').send(`
    <h1>Documentation API</h1>
    <ul>
      <li><a href="http://localhost:3001/docs" target="_blank">Users API documentation</a></li>
      <li><a href="http://localhost:3002/docs" target="_blank">Books API documentation</a></li>
      <li><a href="http://localhost:3003/docs" target="_blank">Emprunts API documentation</a></li>
    </ul>
  `);
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`API Gateway running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
