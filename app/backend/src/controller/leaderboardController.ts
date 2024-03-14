import { Request, Response } from 'express';
import LeaderboardHomeService from '../service/leaderboardHome.service';

class LeaderboardHomeController {
  constructor(private leaderboardHomeService = new LeaderboardHomeService()) {}
  public async getHomeLeaderboard(req: Request, res: Response) {
    try {
      const leaderboard = await this.leaderboardHomeService.getLeaderboardHome();
      res.status(200).json(leaderboard);
    } catch (error) {
      console.error('Error: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default LeaderboardHomeController;
