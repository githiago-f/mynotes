import { createClient } from 'redis';
import { RedisClientType } from 'redis/dist/lib/client';
import { logger } from './logger';

const url = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`;

const RedisClient = async () => {
  try {
    const client = createClient({ url });
    await client.connect();
    logger.debug('Load redis client');
    return client;
  } catch(e) {
    logger.error(e);
    return {} as RedisClientType<{}, {}>;
  }
};

const redisMiddleware: Express.MyRequestHandler = async (req, res, next) => {
  const client = await RedisClient();
  req.client = client;
  next();
};


export {
  RedisClient,
  redisMiddleware
};
