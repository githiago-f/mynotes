declare namespace Express {
  export interface Request {
    redis?:  import('redis/dist/lib/client').RedisClientType<{}, {}> | null;
    user?: import('models/User').User,
    sequelize: import('sequelize/types').Sequelize
  }

  type NextFunction = import('express').NextFunction;

  export type MyRequestHandler = (req: Express.Request, res: Response, next: NextFunction) => Promise<void>;
}
