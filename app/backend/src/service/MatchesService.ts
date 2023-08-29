import MatcheModel from '../model/MatcheModel';
import IMatcheModel from '../Interfaces/IMatchesModels';
import IMatches from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(
    private teamModel: IMatcheModel = new MatcheModel(),
  ) {}

  public async findAll(): Promise<IMatches[]> {
    const matches = await this.teamModel.findAll();
    return matches;
  }
}
