import morgan from 'morgan';
import pino from 'pino';
import { env } from 'process';

const logger = pino({
  transport: {
    target: 'pino-pretty'
  }
});

const level = env.NODE_ENV === 'production' ? 'common' : 'dev';

const expressLogger = morgan(level);

export {
  expressLogger,
  logger
};
