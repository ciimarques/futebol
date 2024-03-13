import LeaderboardItem from '../Interfaces/LeaderboardItem';
import Match from '../Interfaces/Match';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';

class LeaderboardService {
  constructor(private matchModel = MatchesModel) {}

  private async getAllFinishedMatches() {
    return this.matchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }

  public async getLeaderboardHome() {
    const matchesModels = await this.getAllFinishedMatches();
    const matches = matchesModels.map((matchModel) => matchModel.dataValues as Match);

    return LeaderboardService.mapMatchesToLeaderboard(matches);
  }

  private static mapMatchesToLeaderboard(matches: Match[]): LeaderboardItem[] {
    return matches.reduce<LeaderboardItem[]>((acc, match) => {
      let leaderboardItem = acc.find((team) => team.name === match.homeTeam!.teamName);

      if (!leaderboardItem) {
        leaderboardItem = LeaderboardService.initializeLeaderboardItem(match.homeTeam!.teamName);
        acc.push(leaderboardItem);
      }

      leaderboardItem = LeaderboardService.updateLeaderboardItem(leaderboardItem, match);
      const updatedAcc = acc.map((item) => (
        item.name === leaderboardItem!.name ? leaderboardItem! : item
      ));
      return updatedAcc;
    }, []);
  }

  private static initializeLeaderboardItem(teamName: string): LeaderboardItem {
    return {
      name: teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
    };
  }

  private static updateLeaderboardItem(item: LeaderboardItem, match: Match) {
    const updatedItem = { ...item };

    if (match.homeTeamGoals > match.awayTeamGoals) {
      updatedItem.totalPoints += 3;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      updatedItem.totalPoints += 1;
    }

    updatedItem.totalGames += 1;
    updatedItem.totalVictories += match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
    updatedItem.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
    updatedItem.totalLosses += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
    updatedItem.goalsFavor += match.homeTeamGoals;
    updatedItem.goalsOwn += match.awayTeamGoals;

    return updatedItem;
  }
}
export default LeaderboardService;
