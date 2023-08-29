import MatcheModel from '../model/MatcheModel';
import IMatcheModel from '../Interfaces/IMatchesModels';
import IMatches from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(
    private teamModel: IMatcheModel = new MatcheModel(),
  ) {}

  public async findAll(query: string | undefined): Promise<IMatches[]> {
    const matches = await this.teamModel.findAll();

    if (!query) {
      return matches;
    }

    if (query === 'true') {
      return matches.filter((match) => match.inProgress === true);
    }

    return matches.filter((match) => match.inProgress === false);
  }

  public async finishMatchesInProgress(id: number): Promise<boolean> {
    await this.teamModel.finishMatchesInProgress(id);
    return true;
  }

  public async updateMatch(id: number, homeTeam: number, awayTeam: number): Promise<boolean> {
    await this.teamModel.updateMatch(id, homeTeam, awayTeam);
    return true;
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatches> {
    const match = await this.teamModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return match;
  }
}
