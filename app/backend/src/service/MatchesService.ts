import TeamModel from '../model/TeamModel';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import MatcheModel from '../model/MatcheModel';
import IMatcheModel from '../Interfaces/IMatchesModels';
import IMatches from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(
    private matchModel: IMatcheModel = new MatcheModel(),
    private teamModel: ITeamsModel = new TeamModel(),
  ) {}

  public async findAll(query: string | undefined): Promise<IMatches[]> {
    const matches = await this.matchModel.findAll();

    if (!query) {
      return matches;
    }

    if (query === 'true') {
      return matches.filter((match) => match.inProgress === true);
    }

    return matches.filter((match) => match.inProgress === false);
  }

  public async finishMatchesInProgress(id: number): Promise<boolean> {
    await this.matchModel.finishMatchesInProgress(id);
    return true;
  }

  public async updateMatch(id: number, homeTeam: number, awayTeam: number): Promise<boolean> {
    await this.matchModel.updateMatch(id, homeTeam, awayTeam);
    return true;
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<{ status: number, data: { message: string } | IMatches }> {
    const homeTeam = await this.teamModel.findOne(homeTeamId);
    const awayTeam = await this.teamModel.findOne(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }

    const match = await this.matchModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return { status: 201, data: match };
  }
}
