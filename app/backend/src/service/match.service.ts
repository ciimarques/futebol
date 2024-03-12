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

  public async finishMatchById(id: number): Promise<boolean> {
    const match = await this.matchModel.findByPk(id);
    if (!match) {
      return false;
    }
    if (!match.inProgress) {
      throw new Error('Match is not in progress');
    }
    await match.update({ inProgress: false });
    return true;
  }

  public async updateMatchResult(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    const match = await this.matchModel.findByPk(id);
    if (!match) {
      throw new Error('Match not found');
    }

    await match.update({ homeTeamGoals, awayTeamGoals });
  }
}

export default MatchService;
