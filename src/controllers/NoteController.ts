import { Router } from 'express';
import { logger } from 'helpers/logger';
import { Note } from 'models/Note';

export const noteController = () => {
  const router = Router();

  router.get('/', async (req, res, next) => {
    try {
      const result = await req.redis?.get('notes');
      if(result) {
        return res.status(200).json(JSON.parse(result || '[]'));
      }
      const notes = await Note.findAll({
        where: {
          visible: true
        }
      });
      req.redis?.set('notes', JSON.stringify(notes));
      return res.json(notes);
    } catch(e) {
      logger.error(e);
      next(e);
    }
  });

  router.post('/', async (req, res, next) => {
    // TODO create a new public note
  });

  return router;
};
