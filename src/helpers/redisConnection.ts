import { createClient } from 'redis';
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
    return null;
  }
};

const redisMiddleware: Express.MyRequestHandler = async (req, res, next) => {
  req.redis = await RedisClient();
  next();
};


export {
  RedisClient,
  redisMiddleware
};
