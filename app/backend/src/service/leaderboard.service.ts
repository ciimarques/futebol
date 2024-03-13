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
    const leaderboard = matches.reduce<LeaderboardItem[]>((acc, match) => {
      let leaderboardItem = acc.find((team) => team.name === match.homeTeam!.teamName);

      if (!leaderboardItem) {
        leaderboardItem = LeaderboardService.initializeLeaderboardItem(match.homeTeam!.teamName);
        acc.push(leaderboardItem);
      }

      leaderboardItem = LeaderboardService.updateLeaderboardItem(leaderboardItem, match);
      return acc.map((item) => (
        item.name === leaderboardItem!.name ? leaderboardItem : item)) as LeaderboardItem[];
    }, []);

    return leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return b.goalsOwn - a.goalsOwn;
    });
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
      goalsBalance: 0,
      efficiency: '0.00',
    };
  }

  private static updateLeaderboardItem(item: LeaderboardItem, match: Match) {
    const updatedItem = { ...item };
    updatedItem.totalGames += 1;
    updatedItem.goalsFavor += match.homeTeamGoals;
    updatedItem.goalsOwn += match.awayTeamGoals;
    updatedItem.goalsBalance = updatedItem.goalsFavor - updatedItem.goalsOwn;
    if (match.homeTeamGoals > match.awayTeamGoals) {
      updatedItem.totalPoints += 3;
      updatedItem.totalVictories += 1;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      updatedItem.totalPoints += 1;
      updatedItem.totalDraws += 1;
    } else {
      updatedItem.totalLosses += 1;
    }
    return updatedItem;
  }

  private static calculateEfficiency(totalPoints: number, totalGames: number): string {
    if (totalGames > 0) {
      const efficiency = (totalPoints / (totalGames * 3)) * 100;
      return efficiency.toFixed(2);
    }
    return '0.00';
  }
}

export default LeaderboardService;
