import { Router } from 'express';
import teamsRouter from './team.route';
import userRouter from './user.route';
import matchRouter from './match.route';
import leaderboardRouter from './leaderboard.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
