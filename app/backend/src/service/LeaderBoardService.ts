import getTeamsHome from '../utils/getTeamsInfo';
import TeamModel from '../model/TeamModel';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import MatcheModel from '../model/MatcheModel';
import IMatcheModel from '../Interfaces/IMatchesModels';

export default class LeaderBoardService {
  constructor(
    private matchModel: IMatcheModel = new MatcheModel(),
    private teamModel: ITeamsModel = new TeamModel(),
  ) {}

  public async getLeaderBoard(): Promise<unknown> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();

    const leaderBoard = teams.map((team) => {
      const infoLeader = getTeamsHome(team.id, team.teamName, matches);
      return infoLeader;
    });

    return leaderBoard;
  }
}
