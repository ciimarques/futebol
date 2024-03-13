import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/leaderboardController';
import LeaderboardAwayController from '../controller/leaderboardAwayController';

const leaderboardController = new LeaderboardController();
const leaderboardAwayController = new LeaderboardAwayController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getHomeLeaderboard(req, res),
);
router.get(
  '/away',
  (req: Request, res: Response) => leaderboardAwayController.getAwayLeaderboard(req, res),
);

export default router;
