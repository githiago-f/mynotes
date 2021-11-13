declare namespace Express {
  export interface Request {
    client:  import("redis/dist/lib/client").RedisClientType<{}, {}>;
  }

  type NextFunction = import('express').NextFunction;

  export type MyRequestHandler = (req: Express.Request, res: Response, next: NextFunction) => Promise<void>;
}
