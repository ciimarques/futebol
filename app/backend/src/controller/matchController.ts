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
      return res.status(401).json({ message: 'Match not found or already finished' });
    }
    res.status(200).json({ message: 'Finished' });
  }

  public async updateMatchResult(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    try {
      await this.matchService.updateMatchResult(Number(id), homeTeamGoals, awayTeamGoals);
      res.status(200).json({ message: 'Match result updated successfully' });
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      if (errorMessage === 'Match not found') {
        res.status(404).json({ message: errorMessage });
      } else if (errorMessage === 'Match is not in progress') {
        res.status(400).json({ message: errorMessage });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}

export default MatchController;
