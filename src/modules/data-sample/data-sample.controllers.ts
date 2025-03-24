import type {
  DataSampleInsertType,
  DataSampleUpdateType,
} from '#modules/data-sample/data-sample.schemas.js';
import { dataSampleServices } from '#modules/data-sample/data-sample.services.js';
import { httpError } from '#utils/error.js';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export async function createHandler(
  req: FastifyRequest<{
    Body: DataSampleInsertType;
  }>,
  reply: FastifyReply,
) {
  const body = req.body;

  try {
    const data = await dataSampleServices.createData(body);

    if (typeof data === 'object' && 'error' in data) {
      return httpError({
        reply,
        message: data.error,
        code: StatusCodes.CONFLICT,
        cause: 'Conflict',
      });
    }

    return reply.status(StatusCodes.CREATED).send(data);
  } catch (error) {
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function getAllHandler(_req: FastifyRequest, reply: FastifyReply) {
  try {
    const data = await dataSampleServices.getAllData();

    return reply.status(StatusCodes.OK).send(data);
  } catch (error) {
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function getByIdHandler(
  req: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply,
) {
  const id = req.params.id;

  try {
    const data = await dataSampleServices.getByIdData(id);

    if (typeof data === 'object' && 'error' in data) {
      return httpError({
        reply,
        message: data.error,
        code: StatusCodes.NOT_FOUND,
        cause: 'Not Found.',
      });
    }

    return reply.status(StatusCodes.OK).send(data);
  } catch (error) {
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function updateHandler(
  req: FastifyRequest<{
    Params: {
      id: string;
    };
    Body: DataSampleUpdateType;
  }>,
  reply: FastifyReply,
) {
  try {
    const id = req.params.id;
    const body = req.body;

    const data = await dataSampleServices.updateData(id, body);

    if (typeof data === 'object' && 'error' in data) {
      return httpError({
        reply,
        message: data.error,
        code: StatusCodes.NOT_FOUND,
        cause: 'Not Found.',
      });
    }

    return reply.status(StatusCodes.OK).send(data);
  } catch (error) {
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function deleteHandler(
  req: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply,
) {
  const id = req.params.id;

  try {
    const data = await dataSampleServices.deleteData(id);

    if (typeof data === 'object' && 'error' in data) {
      return httpError({
        reply,
        message: data.error,
        code: StatusCodes.NOT_FOUND,
        cause: 'Not Found.',
      });
    }

    return reply.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
}

export const dataSampleControllers = {
  createHandler,
  getAllHandler,
  getByIdHandler,
  updateHandler,
  deleteHandler,
};
