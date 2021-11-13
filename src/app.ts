import express from 'express';
import { logger } from 'helpers/logger';
import { RedisClient } from 'helpers/redisConnection';

const app = express();

app.use(async (req, res, next) => {
  const client = await RedisClient();
  (req as any).redisClient = client;
  next();
});

app.get('/', async (req, res, next) => {
  logger.info('Still counting');
  const client = (req as any).redisClient;
  const currentCount = parseInt(await client.get('count') || '1');
  await client.set('count',  String(currentCount+1));
  res.end('Contagem: ' + currentCount);
  next();
});

app.use(async (req, res, next) => {
  const client = (req as any).redisClient;
  await client.disconnect();
});

export { app };
