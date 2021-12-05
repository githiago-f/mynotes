import { noteController } from 'controllers/NoteController';
import express from 'express';
import 'helpers/sequelize';
import { expressLogger } from 'helpers/logger';
import { passportMiddleware } from 'helpers/passport';
import { noteSecuredController } from 'controllers/NoteSecuredController';
import { userController } from 'controllers/UserController';
import { errorHandleController } from 'controllers/ErrorHandleController';
import passport from 'passport';
import { RedisService } from 'domain/service/RedisService';
import { RedisClient } from 'helpers/redisConnection';
import { healthyController } from 'controllers/HealthyController';

const app = express();

app.use((req, res, next) => {
  res.set({
    'access-control-allow-methods': 'GET, OPTIONS',
    'x-powered-by': 'None of your business :)'
  });
  next();
});

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({
  inflate: true,
  extended: false
}));

app.use(passport.initialize());

const globalRedisService = new RedisService(RedisClient());

app.use('/health', healthyController());
app.use('/api/v1/notes', noteController(globalRedisService));
app.use('/api/v1/users', userController());

/**
 * these routes will be replaced.
 * Will use RBAC
 */
app.use('/api/v1/users/me/notes', passportMiddleware, noteSecuredController());
app.use('/api/v1/users/:id/notes', passportMiddleware, noteSecuredController());

app.use(errorHandleController);

export { app };
