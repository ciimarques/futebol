import { Router } from 'express';
import teamsRouter from './team.route';
import userRouter from './user.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);

export default router;
