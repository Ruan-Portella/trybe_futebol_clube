import ILeaderBoard from '../Interfaces/ILeaderBoard';

function getOrder(teamHome: ILeaderBoard, teamAway: ILeaderBoard): number {
  if (teamHome.totalVictories < teamAway.totalVictories) return 1;
  if (teamHome.totalVictories > teamAway.totalVictories) return -1;
  if (teamHome.goalsBalance < teamAway.goalsBalance) return 1;
  if (teamHome.goalsBalance > teamAway.goalsBalance) return -1;
  if (teamHome.goalsFavor < teamAway.goalsFavor) return 1;
  if (teamHome.goalsFavor > teamAway.goalsFavor) return -1;
  return 0;
}

function getOrderTeams(teams: ILeaderBoard[]): ILeaderBoard[] {
  teams.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    return getOrder(a, b);
  });
  return teams;
}

export default getOrderTeams;
