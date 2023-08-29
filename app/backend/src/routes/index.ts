import { Router } from 'express';
import TeamRouter from './TeamRoutes';
import UserRouter from './UserRoutes';
import MatchesRouter from './MatchesRoutes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchesRouter);

export default router;
