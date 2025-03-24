import { errorHandler, errorResponse } from '#utils/error.js';
import { logger } from '#utils/logger.js';
import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { fastify } from 'fastify';
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { z } from 'zod';

export async function buildServer() {
  const app = fastify({
    loggerInstance: logger,
  }).withTypeProvider<ZodTypeProvider>();

  const theme = new SwaggerTheme();
  const content = theme.getBuffer(SwaggerThemeNameEnum.DARK);

  // Register plugins
  app.setErrorHandler(errorHandler);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyCors, { origin: '*' });

  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API Fastify CRUD',
        version: '0.0.1',
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    theme: {
      css: [{ filename: 'theme.css', content: content }],
    },
  });

  // Register routes
  app.get(
    '/',
    {
      schema: {
        tags: ['Welcome'],
        description: 'Welcome API Fastify CRUD.',
        response: {
          200: z
            .object({
              message: z.string(),
            })
            .describe('Welcome API Fastify CRUD.'),
        },
      },
    },
    () => {
      return { message: 'Welcome API Fastify CRUD' };
    },
  );

  app.get(
    '/health-check',
    {
      schema: {
        tags: ['Health Check'],
        description: 'Health Check API Fastify CRUD.',
        response: {
          200: z
            .object({
              status: z.string(),
            })
            .describe('Health Check API Fastify CRUD.'),
          ...errorResponse,
        },
      },
    },
    async () => {
      return { status: 'ok' };
    },
  );

  return app;
}
