import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // Middleware to soft-delete entries instead of hard-delete. Replaces delete actions with an update that sets `deleted_at`.
  softDelMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.action === 'delete') {
      return next({
        ...params,
        action: 'update',
        args: {
          ...params.args,
          data: {
            deleted_at: new Date(),
          },
        },
      });
    }
    return next(params);
  };

  // Middleware to automatically filter out soft-deleted records.
  findMiddleware: Prisma.Middleware = async (params, next) => {
    if (
      params.action === 'findUnique' ||
      params.action === 'findFirst' ||
      params.action === 'findMany'
    ) {
      return next({
        ...params,
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deleted_at: null,
          },
        },
      });
    }
    return next(params);
  };
}
