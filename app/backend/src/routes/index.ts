import { Router } from 'express';
import teamsRouter from './team.route';
import userRouter from './user.route';
import matchRouter from './match.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
