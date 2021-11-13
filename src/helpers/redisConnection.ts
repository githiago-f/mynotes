import { createClient } from "redis";
import { logger } from "./logger";

const url = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`

const RedisClient = async () => {
  logger.info('Connecting to redis!');
  logger.info(`Trying to connect to: ${url}`);
  const client = createClient({ url });
  await client.connect();
  return client;
}


export {
  RedisClient
};
