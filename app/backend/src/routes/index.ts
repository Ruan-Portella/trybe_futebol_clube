import { Router } from 'express';
import TeamRouter from './TeamRoutes';
import UserRouter from './UserRoutes';
import MatchesRouter from './MatchesRoutes';
import leaderBoardRouter from './LeaderBoardRoutes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
