require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');
const empruntRoutes = require('./routes/empruntRoutes');

const PORT = process.env.PORT || 3003;

fastify.register(fastifyCors, { origin: '*' });

fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Emprunts Microservice API',
      description: 'API de gestion des emprunts pour la bibliothèque numérique du DIT',
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

fastify.register(empruntRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`Emprunts microservice running on port ${PORT}`);
    fastify.log.info(`Swagger docs available at http://localhost:${PORT}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
