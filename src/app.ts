import { noteController } from 'controllers/NoteController';
import express from 'express';
import { disconnectMiddleware } from 'helpers/disconnect-all';
import { middleware } from 'helpers/redisConnection';

const app = express();

app.use(middleware);

app.use('/api/v1/notes', noteController());

app.use(disconnectMiddleware);

export { app };
