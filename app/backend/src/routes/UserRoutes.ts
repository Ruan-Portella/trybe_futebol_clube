import { Request, Response, Router } from 'express';

import ValidateLogin from '../middlewares/validationLogin';
import UserController from '../controllers/UserController';

const teamController = new UserController();

const router = Router();

router.post(
  '/',
  ValidateLogin.validate,
  ValidateLogin.validateEmail,
  ValidateLogin.validatePassword,
  (req: Request, res: Response) => teamController.findOne(req, res),
);

router.get(
  '/role',
  ValidateLogin.validateToken,
  (req: Request, res: Response) => teamController.findById(req, res),
);

export default router;
