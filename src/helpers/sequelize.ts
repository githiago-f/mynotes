import { Sequelize } from 'sequelize';
import { logger } from './logger';

const accessUrl = process.env.NODE_ENV === 'test' ?
  'sqlite::memory:' :
  (process.env.SQL_URL as string);

const isProduction = process.env.NODE_ENV !== 'production';
const LOG = logger.child({
  name: 'SQL'
});

const logFunction = (sql: string, timing?: number) => {
  if(isProduction) {
    LOG.info(sql);
  } else {
    LOG.debug(sql);
  }
};

export const sequelize = new Sequelize(accessUrl, {
  logging: logFunction
});

(async () => {
  try {
    LOG.info('Testing SQL connection');
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  } catch(e) {
    LOG.error(e);
  }
})();

