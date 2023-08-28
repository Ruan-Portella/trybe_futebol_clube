import { Router } from 'express';
import TeamRouter from './TeamRoutes';

const router = Router();

router.use('/teams', TeamRouter);

export default router;
