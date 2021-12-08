import { Router } from 'express';
import { logger } from 'helpers/logger';
import { NoteRepository } from 'domain/repository/NoteRepository';
import { NotesService } from 'domain/service/NotesService';
import { RedisService } from 'domain/service/RedisService';
import { NoteDTO } from 'domain/dto/NoteDTO';
import { makeValidateBody } from 'express-class-validator';

const LOG = logger.child({
  name: '@NoteController'
});

export const noteController = (redisService: RedisService) => {
  const router = Router();
  const noteRepository = new NoteRepository();
  const notesService = new NotesService(noteRepository, redisService);

  router.get('/', async (req, res, next) => {
    try {
      const page = parseInt(req.query?.page as string || '0');
      const data = await notesService.getNotesPaged(page);
      return res.json(data);
    } catch(e) {
      LOG.error(e);
      next(e);
    }
  });

  router.post('/', makeValidateBody(NoteDTO), async (req, res, next) => {
    try {
      const note = await notesService.createNote(req.body as NoteDTO);
      return res.json(note);
    } catch(e) {
      LOG.error(e);
      next(e);
    }
  });

  return router;
};
