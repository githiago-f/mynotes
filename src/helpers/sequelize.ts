import { Sequelize } from 'sequelize';
import { logger } from './logger';

export const sequelizeMiddleware:Express.MyRequestHandler = async (req, res, next) => {
  const accessUrl = process.env.NODE_ENV === 'test' ?
    'sqlite::memory:' :
    (process.env.SQL_URL as string);
  const sequelize = new Sequelize(accessUrl, {
    logging: logger.debug
  });

  try {
    logger.info('Testing SQL connection');
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch(e) {
    logger.error(e);
  }
  next();
};

