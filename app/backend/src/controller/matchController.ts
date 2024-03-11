import { Request, Response } from 'express';
import MatchService from '../service/match.service';

class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAllMatch(req: Request, res: Response) {
    const inProgressQuery = req.query.inProgress;
    const inProgress = typeof inProgressQuery === 'string' ? inProgressQuery : undefined;
    const matches = await this.matchService.getMatches(inProgress);
    res.status(200).json(matches);
  }
}

export default MatchController;
