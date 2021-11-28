import { Router } from 'express';

export const noteSecuredController = () => {
  const router = Router();

  router.get('/', (req, res, next) => {
    // TODO get all notes for current user
    res.end('Authenticated!');
  });

  router.post('/', (req, res, next) => {
    // TODO create a new note for current user
  });

  return router;
};
