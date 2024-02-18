import { Request, Response } from 'express';
import TeamsService from '../service/team.service';

class TeamController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeam(_req: Request, res: Response) {
    const product = await this.teamsService.teamsGetAll();
    res.status(200).json(product);
  }
}

export default TeamController;
