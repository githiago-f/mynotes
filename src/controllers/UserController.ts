import { Router } from "express"

export const userController = () => {
  const router = Router();

  router.post('/', (req, res) => {
    // TODO create a new user
  });

  router.get('/', (req, res) => {
    // TODO get user
  });

  return router;
}
