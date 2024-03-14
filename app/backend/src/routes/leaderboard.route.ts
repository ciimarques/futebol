import { Request, Response, Router } from 'express';
import LeaderboardHomeController from '../controller/leaderboardController';
import LeaderboardAwayController from '../controller/leaderboardAwayController';

const leaderboardHomeController = new LeaderboardHomeController();
const leaderboardAwayController = new LeaderboardAwayController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardHomeController.getHomeLeaderboard(req, res),
);
router.get(
  '/away',
  (req: Request, res: Response) => leaderboardAwayController.getAwayLeaderboard(req, res),
);

export default router;
