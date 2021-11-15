import env from 'dotenv';
import { logger } from 'helpers/logger';
import path from 'path';

console.clear();
const envPaht = path.resolve(__dirname, '..', '.env.local');
logger.info('Loading env file at: ' + envPaht);

env.config({ path: envPaht });
logger.info('envfile loaded!');

import { app } from 'app';

app.listen(3000, '0.0.0.0', () => {
  logger.info('Listening at 0.0.0.0:3000');
});
