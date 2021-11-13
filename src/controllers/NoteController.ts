import { Router } from "express"
import { logger } from "helpers/logger";

export const noteController = () => {
  const router = Router();

  router.get('/', async (req, res, next) => {
    try {
      const result = await req.client.get('notes');
      res.status(200).json(JSON.parse(result || '{}'));
      next();
    }catch(e) {
      logger.error(e);
      res.status(500).end();
    }
  });

  return router;
}
