import { Request, Response, Router } from 'express';

import MatchesController from '../controllers/MatchesController';

const matchersController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchersController.findAll(req, res));

export default router;
