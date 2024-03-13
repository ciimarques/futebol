import { Request, Response } from 'express';
import LeaderboardAwayService from '../service/leaderboardAway.service';

class LeaderboardAwayController {
  constructor(private leaderboardAwayService = new LeaderboardAwayService()) {}
  public async getAwayLeaderboard(req: Request, res: Response) {
    try {
      const leaderboardAway = await this.leaderboardAwayService.getLeaderboardAway();
      res.status(200).json(leaderboardAway);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default LeaderboardAwayController;
