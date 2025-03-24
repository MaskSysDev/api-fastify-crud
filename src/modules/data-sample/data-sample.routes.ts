import { dataSampleControllers } from '#modules/data-sample/data-sample.controllers.js';
import {
  dataSampleInsertSchema,
  dataSampleSelectSchema,
  dataSampleUpdateSchema,
  paramsDataSampleSchema,
} from '#modules/data-sample/data-sample.schemas.js';
import type { FastifyTypedInstance } from '#types/fastify-typed-instance.js';
import { httpErrorSchema } from '#utils/error.js';
import { z } from 'zod';

export async function dataSampleRoutes(app: FastifyTypedInstance) {
  app.post(
    '/data-sample',
    {
      schema: {
        tags: ['data-sample'],
        description: 'Create Data Sample',
        body: dataSampleInsertSchema,
        response: {
          201: dataSampleSelectSchema.describe('Data Sample created.'),
          409: httpErrorSchema.describe('Data already exists.'),
        },
      },
    },
    dataSampleControllers.createHandler,
  );

  app.get(
    '/data-sample',
    {
      schema: {
        tags: ['data-sample'],
        description: 'List Data Sample.',
        response: {
          200: dataSampleSelectSchema.array().describe('Data Sample listed'),
        },
      },
    },
    dataSampleControllers.getAllHandler,
  );

  app.get(
    '/data-sample/:id',
    {
      schema: {
        tags: ['data-sample'],
        description: 'Get a Data Sample.',
        params: paramsDataSampleSchema,
        response: {
          200: dataSampleSelectSchema.describe('Got a Data Sample.'),
          404: httpErrorSchema.describe('Data not found.'),
        },
      },
    },
    dataSampleControllers.getByIdHandler,
  );

  app.patch(
    '/data-sample/:id',
    {
      schema: {
        tags: ['data-sample'],
        description: 'Update a Data Sample.',
        params: paramsDataSampleSchema,
        body: dataSampleUpdateSchema,
        response: {
          200: dataSampleSelectSchema.describe('Data Sample updated.'),
          404: httpErrorSchema.describe('Data not found.'),
        },
      },
    },
    dataSampleControllers.updateHandler,
  );

  app.delete(
    '/data-sample/:id',
    {
      schema: {
        tags: ['data-sample'],
        description: 'Delete a Data Sample.',
        params: paramsDataSampleSchema,
        response: {
          204: z.null().describe('Data Sample deleted.'),
          404: httpErrorSchema.describe('Data not found.'),
        },
      },
    },
    dataSampleControllers.deleteHandler,
  );
}
