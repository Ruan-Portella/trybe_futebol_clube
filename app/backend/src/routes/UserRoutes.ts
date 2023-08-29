import { Request, Response, Router } from 'express';

import ValidateLogin from '../middlewares/validationLogin';
import UserController from '../controllers/UserController';

const teamController = new UserController();

const router = Router();

router.post(
  '/',
  ValidateLogin.validate,
  (req: Request, res: Response) => teamController.findOne(req, res),
);

export default router;
