import { dataSampleTable } from '#schema/data-sample.js';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

// Schema for inserting a user - can be used to validate API requests
export const dataSampleInsertSchema = createInsertSchema(dataSampleTable, {
  name: z
    .string({
      required_error: 'Name is required.',
      invalid_type_error: 'Name must be a string value.',
    })
    .min(1, { message: 'Name is required.' })
    .trim(),
  description: z
    .string({
      invalid_type_error: 'Name must be a string value.',
    })
    .max(120, {
      message: 'The name must contain a maximum of 120 characters.',
    })
    .trim()
    .nullable()
    .optional(),
}).pick({ name: true, description: true });

// Schema for selecting a user - can be used to validate API responses
export const dataSampleSelectSchema = createSelectSchema(dataSampleTable, {
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
}).pick({ id: true, name: true, description: true });

// Schema for updating a user - can be used to validate API requests
export const dataSampleUpdateSchema = createUpdateSchema(dataSampleTable, {
  name: z
    .string({
      required_error: 'Name is required.',
      invalid_type_error: 'Name must be a string value.',
    })
    .min(1, { message: 'Name is required.' })
    .trim(),
  description: z
    .string({
      invalid_type_error: 'Name must be a string value.',
    })
    .max(120, {
      message: 'The name must contain a maximum of 120 characters.',
    })
    .trim()
    .nullable()
    .optional(),
})
  .pick({
    name: true,
    description: true,
  })
  .partial();

export const paramsDataSampleSchema = z
  .object({
    id: z.string(),
  })
  .partial();

// Types of schemes
export type DataSampleInsertType = typeof dataSampleInsertSchema._type;

export type DataSampleSelectType = typeof dataSampleSelectSchema._type;

export type DataSampleUpdateType = typeof dataSampleUpdateSchema._type;
