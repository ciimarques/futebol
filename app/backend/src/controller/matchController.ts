import { Request, Response } from 'express';
import MatchService from '../service/match.service';

class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatch(_req: Request, res: Response) {
    const matches = await this.matchService.getMatches();
    res.status(200).json(matches);
  }
}

export default MatchController;
