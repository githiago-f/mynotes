import { Sequelize } from 'sequelize';
import { logger } from './logger';

const accessUrl = process.env.NODE_ENV === 'test' ?
  'sqlite::memory:' :
  (process.env.SQL_URL as string);
export const sequelize = new Sequelize(accessUrl, {
  logging: logger.debug
});

(async () => {
  try {
    logger.info('Testing SQL connection');
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch(e) {
    logger.error(e);
  }
})();

