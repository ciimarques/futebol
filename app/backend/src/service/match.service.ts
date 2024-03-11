import TeamModel from '../database/models/TeamsModel';
import Match from '../Interfaces/Match';
import MatchesModel from '../database/models/MatchesModel';

class MatchService {
  constructor(private matchModel = MatchesModel) {}
  public async getMatches(inProgress?: string): Promise<Match[]> {
    let whereCondition = {};
    if (inProgress !== undefined) {
      whereCondition = { inProgress: inProgress === 'true' };
    }
    const matches: Match[] = await this.matchModel.findAll({
      where: whereCondition,
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}

export default MatchService;
