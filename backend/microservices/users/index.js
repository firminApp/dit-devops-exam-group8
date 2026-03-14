

require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUi = require('@fastify/swagger-ui');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3001;

fastify.register(fastifyCors, { origin: '*' });

// Swagger (OpenAPI) documentation
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Users Microservice API',
      description: 'API de gestion des utilisateurs pour la bibliothèque numérique du DIT',
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

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`Users microservice running on port ${PORT}`);
    fastify.log.info(`Swagger docs available at http://localhost:${PORT}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
