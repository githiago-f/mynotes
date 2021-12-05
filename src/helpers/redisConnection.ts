import { createClient } from 'redis';
import { logger } from './logger';

const redisLogger = logger.child({
  name: 'RedisClient'
});

const url = process.env.REDIS_URL || `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`;

export const RedisClient = () => {
  const client = createClient({ url });
  redisLogger.debug('Load redis client');
  return client;
};
