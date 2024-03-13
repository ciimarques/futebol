import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}
  public async getHomeLeaderboard(req: Request, res: Response) {
    try {
      const leaderboard = await this.leaderboardService.getLeaderboardHome();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default LeaderboardController;
