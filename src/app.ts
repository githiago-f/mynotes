import { noteController } from 'controllers/NoteController';
import express from 'express';
import { disconnectMiddleware } from 'helpers/disconnect-all';
import { expressLogger } from 'helpers/logger';
import { redisMiddleware } from 'helpers/redisConnection';
import { sequelizeMiddleware } from 'helpers/sequelize';
import { passportMiddleware } from 'helpers/passport';
import { noteSecuredController } from 'controllers/NoteSecuredController';

const app = express();

app.use(sequelizeMiddleware);
app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({
  inflate: true,
  extended: false
}));

app.use(redisMiddleware);

app.use('/api/v1/notes', noteController());

app.use('/api/v1/notes/private', passportMiddleware, noteSecuredController());

app.use(disconnectMiddleware);

export { app };
