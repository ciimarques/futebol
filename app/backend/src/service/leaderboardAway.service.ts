import LeaderboardItem from '../Interfaces/LeaderboardItem';
import Match from '../Interfaces/Match';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';

class LeaderboardAwayService {
  constructor(private matchModel = MatchesModel) {}

  private async getAllFinishedMatches() {
    return this.matchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
      ],
    });
  }

  public async getLeaderboardAway() {
    const matchesModels = await this.getAllFinishedMatches();
    const matches = matchesModels.map((matchModel) => matchModel.dataValues as Match);

    return LeaderboardAwayService.mapMatchesToLeaderboard(matches);
  }

  private static mapMatchesToLeaderboard(matches: Match[]): LeaderboardItem[] {
    const leaderboard = matches.reduce<LeaderboardItem[]>((acc, match) => {
      let leaderboardItem = acc.find((team) => team.name === match.awayTeam!.teamName);

      if (!leaderboardItem) {
        leaderboardItem = LeaderboardAwayService
          .initializeLeaderboardItem(match.awayTeam!.teamName);
        acc.push(leaderboardItem);
      }

      leaderboardItem = LeaderboardAwayService.updateLeaderboardItem(leaderboardItem, match);
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

  private static updateLeaderboardItem(item: LeaderboardItem, match: Match): LeaderboardItem {
    const updatedItem = { ...item };
    updatedItem.totalGames += 1;
    updatedItem.goalsFavor += match.awayTeamGoals;
    updatedItem.goalsOwn += match.homeTeamGoals;
    updatedItem.goalsBalance = updatedItem.goalsFavor - updatedItem.goalsOwn;
    if (match.awayTeamGoals > match.homeTeamGoals) {
      updatedItem.totalPoints += 3;
      updatedItem.totalVictories += 1;
    } else if (match.awayTeamGoals === match.homeTeamGoals) {
      updatedItem.totalPoints += 1;
      updatedItem.totalDraws += 1;
    } else {
      updatedItem.totalLosses += 1;
    }
    return LeaderboardAwayService.updateEfficiency(updatedItem);
  }

  private static updateEfficiency(item: LeaderboardItem): LeaderboardItem {
    const updatedItem = { ...item };
    updatedItem.efficiency = LeaderboardAwayService.calculateEfficiency(
      updatedItem.totalPoints,
      updatedItem.totalGames,
    );
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

export default LeaderboardAwayService;
