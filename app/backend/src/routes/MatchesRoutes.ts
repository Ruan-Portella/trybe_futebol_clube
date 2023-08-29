import { Request, Response, Router } from 'express';
import ValidateLogin from '../middlewares/validationLogin';

import MatchesController from '../controllers/MatchesController';

const matchersController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchersController.findAll(req, res));
router.patch(
  '/:id/finish',
  ValidateLogin.validateToken,
  (req: Request, res: Response) => matchersController.finishMatchesInProgress(req, res),
);
router.patch(
  '/:id',
  ValidateLogin.validateToken,
  (req: Request, res: Response) => matchersController.updateMatch(req, res),
);

export default router;
