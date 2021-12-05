import { Router } from 'express';

export const healthyController = () => {
  const router = Router();

  router.get('/', (req, res) => {
    res.json({
      healthy: true,
      message: 'I\'m healthy!'
    });
  });

  return router;
};
