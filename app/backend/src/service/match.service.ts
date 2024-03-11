import TeamModel from '../database/models/TeamsModel';
import Match from '../Interfaces/Match';
import MatchesModel from '../database/models/MatchesModel';

class MatchService {
  constructor(
    private matches = MatchesModel,
  ) { }

  public async getMatches(): Promise<Match[]> {
    const matches: Match[] = await this.matches.findAll({
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }
}

export default MatchService;
