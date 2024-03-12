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

  public async finishMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const match = await this.matchService.finishMatchById(Number(id));
    if (!match) {
      return res.status(404).json({ message: 'Match not found or already finished' });
    }
    res.status(200).json({ message: 'Finished' });
  }
}

export default MatchController;
