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
}

export default TeamsService;
