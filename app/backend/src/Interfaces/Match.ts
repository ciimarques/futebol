import Team from './Team';

export default interface Match {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam?: Team,
  awayTeam?: Team,
}
