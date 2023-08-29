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
}
