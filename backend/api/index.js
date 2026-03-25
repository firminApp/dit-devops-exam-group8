require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const empruntRoutes = require('./routes/empruntRoutes');
const { initDb } = require('./models/initDb');

const PORT = process.env.PORT || 3000;

fastify.register(fastifyCors, { origin: '*' });

fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Bibliotheque DIT API',
      description: 'API  de gestion des utilisateurs, livres et emprunts',
      version: '1.0.0',
    },
    host: `localhost:${PORT}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});
fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
});

fastify.register(userRoutes);
fastify.register(bookRoutes);
fastify.register(empruntRoutes);

fastify.get('/health', async () => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    await initDb();
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`API running on port ${PORT}`);
    fastify.log.info(`Swagger docs available at http://localhost:${PORT}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
