import { Router } from 'express';
import TeamRouter from './TeamRoutes';
import UserRouter from './UserRoutes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);

export default router;
