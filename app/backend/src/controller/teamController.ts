import { Request, Response } from 'express';
import TeamsService from '../service/team.service';

class TeamController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeam(_req: Request, res: Response) {
    const teams = await this.teamsService.teamsGetAll();
    res.status(200).json(teams);
  }

  public async getByIdTeam(req: Request, res: Response) {
    const { id } = req.params;

    const team = await this.teamsService.getTeamById(id as unknown as number);
    res.status(200).json(team);
  }
}

export default TeamController;
