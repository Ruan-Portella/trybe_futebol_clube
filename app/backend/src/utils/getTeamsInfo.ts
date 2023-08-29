import IMatches from '../Interfaces/IMatches';

const objTeam = {
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '',
};

const getTeamsHome = (id: number, teamName: string, matches: IMatches[]) => {
  const teamMatches = matches.filter((match) => match.homeTeamId === id);
  const team = {
    name: teamName,
    ...objTeam,
  };

  teamMatches.forEach((match) => {
    team.totalGames += 1;
    team.goalsFavor += match.homeTeamGoals;
    team.goalsOwn += match.awayTeamGoals;
    team.totalVictories += match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
    team.totalLosses += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
    team.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
  });

  team.totalPoints += (team.totalVictories * 3) + team.totalDraws;
  team.goalsBalance = team.goalsFavor - team.goalsOwn;
  team.efficiency = `${((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2)}`;
  return team;
};

const getTeamsAway = (id: number, teamName: string, matches: IMatches[]) => {
  const teamMatches = matches.filter((match) => match.awayTeamId === id);
  const team = {
    name: teamName,
    ...objTeam,
  };

  teamMatches.forEach((match) => {
    team.totalGames += 1;
    team.goalsFavor += match.awayTeamGoals;
    team.goalsOwn += match.homeTeamGoals;
    team.totalVictories += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
    team.totalLosses += match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
    team.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
  });

  team.totalPoints += (team.totalVictories * 3) + team.totalDraws;
  team.goalsBalance = team.goalsFavor - team.goalsOwn;
  team.efficiency = `${((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2)}`;
  return team;
};

export default {
  getTeamsHome, getTeamsAway,
};
