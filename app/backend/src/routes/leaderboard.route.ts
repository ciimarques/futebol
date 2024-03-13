import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/leaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getHomeLeaderboard(req, res),
);

export default router;
