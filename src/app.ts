import { noteController } from 'controllers/NoteController';
import express from 'express';
import 'helpers/sequelize';
import { disconnectMiddleware } from 'helpers/disconnect-all';
import { expressLogger } from 'helpers/logger';
import { redisMiddleware } from 'helpers/redisConnection';
import { passportMiddleware } from 'helpers/passport';
import { noteSecuredController } from 'controllers/NoteSecuredController';
import { userController } from 'controllers/UserController';
import passport from 'passport';
import { errorHandleController } from 'controllers/ErrorHandleController';

const app = express();

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({
  inflate: true,
  extended: false
}));

app.use(passport.initialize());

app.use(redisMiddleware);

app.use('/api/v1/notes', noteController());
app.use('/api/v1/users', userController());

app.use(passportMiddleware);

app.use('/api/v1/users/me/notes', noteSecuredController());
app.use('/api/v1/users/:id/notes', noteSecuredController());

app.use(disconnectMiddleware);
app.use(errorHandleController);

export { app };
