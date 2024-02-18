import Team from '../Interfaces/Team';
import TeamModel from '../database/models/TeamsModel';

class TeamsService {
  constructor(
    private teamModel = TeamModel,
  ) { }

  public async teamsGetAll(): Promise<Team[]> {
    const teamsAll = await this.teamModel.findAll();
    return teamsAll;
  }

  public async getTeamById(id: number): Promise<Team | null> {
    const team = await this.teamModel.findByPk(id);
    return team;
  }
}

export default TeamsService;
