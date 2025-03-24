import { db } from '#db';
import {
  type DataSampleInsertType,
  type DataSampleUpdateType,
  dataSampleInsertSchema,
  dataSampleSelectSchema,
  dataSampleUpdateSchema,
} from '#modules/data-sample/data-sample.schemas.js';
import { dataSampleTable } from '#schema/data-sample.js';
import { eq } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';

export async function createData(data: DataSampleInsertType) {
  const dataSampleData = dataSampleInsertSchema.parse(data);

  const [existeData] = await db
    .select()
    .from(dataSampleTable)
    .where(eq(dataSampleTable.name, dataSampleData.name));

  if (existeData) {
    return {
      statusCode: StatusCodes.CONFLICT,
      error: 'Data already exists',
    };
  }

  const [newData] = await db
    .insert(dataSampleTable)
    .values(dataSampleData)
    .returning();

  const parsedNewData = dataSampleSelectSchema.parse(newData);

  return parsedNewData;
}

export async function getAllData() {
  const data = await db.select().from(dataSampleTable);

  const parsedData = dataSampleSelectSchema.array().parse(data);

  return parsedData;
}

export async function getByIdData(id: string) {
  const [data] = await db
    .select()
    .from(dataSampleTable)
    .where(eq(dataSampleTable.id, id));

  if (!data) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      error: 'Data not found.',
    };
  }

  const parsedData = dataSampleSelectSchema.parse(data);

  return parsedData;
}

export async function updateData(id: string, data: DataSampleUpdateType) {
  const parsedData = dataSampleUpdateSchema.parse(data);

  const [existeData] = await db
    .select()
    .from(dataSampleTable)
    .where(eq(dataSampleTable.id, id));

  if (!existeData) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      error: 'Data not found.',
    };
  }

  const [updatedData] = await db
    .update(dataSampleTable)
    .set(parsedData)
    .where(eq(dataSampleTable.id, id))
    .returning();

  const parsedUpdateData = dataSampleSelectSchema.parse(updatedData);

  return parsedUpdateData;
}

export async function deleteData(id: string) {
  const [existeData] = await db
    .select()
    .from(dataSampleTable)
    .where(eq(dataSampleTable.id, id));

  if (!existeData) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      error: 'Data not found.',
    };
  }

  await db.delete(dataSampleTable).where(eq(dataSampleTable.id, id));

  return;
}

export const dataSampleServices = {
  createData,
  getAllData,
  getByIdData,
  updateData,
  deleteData,
};
