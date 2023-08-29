import TeamsModel from '../database/models/TeamsModel';
import MatchesModels from '../database/models/MatchersModel';
import IMachesModel from '../Interfaces/IMatchesModels';

export default class MatcheModel implements IMachesModel {
  private model = MatchesModels;

  public async findAll(): Promise<unknown> {
    const matchers = await this.model.findAll({
      include: [{
        model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      {
        model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] },
      }],
    });
    return matchers as unknown;
  }

  public async finishMatchesInProgress(id: number): Promise<boolean> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return true;
  }
}
