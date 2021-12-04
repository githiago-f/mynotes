import { Router } from 'express';
import { User } from 'models/User';
import { makeValidateBody } from 'express-class-validator';
import { UserDTO } from './dto/UserDTO';
import { hash } from 'bcrypt';

export const userController = () => {
  const router = Router();

  router.post('/', makeValidateBody(UserDTO), async (req, res, next) => {
    const userDTO = req.body as UserDTO;

    const user = await User.create({
      email: userDTO.email,
      password: await hash(userDTO.password, 10)
    });

    res.json(user.toJSON());
    next();
  });

  return router;
};
