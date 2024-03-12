import { Request, Response } from 'express';
import MatchService from '../service/match.service';
import TeamModel from '../database/models/TeamsModel';

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

  private static async validateTeams(homeTeamId: number, awayTeamId: number): Promise<void> {
    if (homeTeamId === awayTeamId) {
      throw new Error('It is not possible to create a match with two equal teams');
    }

    const homeTeamExists = await TeamModel.findByPk(homeTeamId);
    const awayTeamExists = await TeamModel.findByPk(awayTeamId);

    if (!homeTeamExists || !awayTeamExists) {
      throw new Error('There is no team with such id!');
    }
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    try {
      await MatchController.validateTeams(homeTeamId, awayTeamId);

      const newMatch = await this.matchService.createMatch({
        homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals,
      });

      res.status(201).json(newMatch);
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      if (errorMessage === 'It is not possible to create a match with two equal teams') {
        return res.status(422).json({ message: errorMessage });
      }
      if (errorMessage === 'There is no team with such id!') {
        return res.status(404).json({ message: errorMessage });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default MatchController;
