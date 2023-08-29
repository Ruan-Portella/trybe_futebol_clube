import getOrderTeams from '../utils/getOrderTeams';
import getTeams from '../utils/getTeamsInfo';
import TeamModel from '../model/TeamModel';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import MatcheModel from '../model/MatcheModel';
import IMatcheModel from '../Interfaces/IMatchesModels';

export default class LeaderBoardService {
  constructor(
    private matchModel: IMatcheModel = new MatcheModel(),
    private teamModel: ITeamsModel = new TeamModel(),
  ) {}

  public async getLeaderBoardHome(): Promise<unknown> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();
    const matchesFinished = matches.filter((m) => m.inProgress === false);
    const leaderBoard = teams.map((team) => {
      const infoLeader = getTeams.getTeamsHome(team.id, team.teamName, matchesFinished);
      return infoLeader;
    });
    const orderLeaderBoard = await getOrderTeams(leaderBoard);
    return orderLeaderBoard;
  }

  public async getLeaderBoardAway(): Promise<unknown> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();
    const matchesFinished = matches.filter((m) => m.inProgress === false);

    const leaderBoard = teams.map((team) => {
      const infoLeader = getTeams.getTeamsAway(team.id, team.teamName, matchesFinished);
      return infoLeader;
    });
    const orderLeaderBoard = await getOrderTeams(leaderBoard);
    return orderLeaderBoard;
  }

  public async getLeaderBoard(): Promise<unknown> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();
    const matchesFinished = matches.filter((m) => m.inProgress === false);

    const leaderBoard = teams.map((team) => {
      const infoLeader = getTeams.getTeamsInfo(team.id, team.teamName, matchesFinished);
      return infoLeader;
    });
    const orderLeaderBoard = await getOrderTeams(leaderBoard);
    return orderLeaderBoard;
  }
}
