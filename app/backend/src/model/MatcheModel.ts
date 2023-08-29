import IMatches from '../Interfaces/IMatches';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModels from '../database/models/MatchersModel';
import IMachesModel from '../Interfaces/IMatchesModels';

export default class MatcheModel implements IMachesModel {
  private model = MatchesModels;

  public async findAll(): Promise<IMatches[]> {
    const matchers = await this.model.findAll({
      include: [{
        model: TeamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      {
        model: TeamsModel, as: 'awayTeam', attributes: { exclude: ['id'] },
      }],
    });
    return matchers as IMatches[];
  }

  public async finishMatchesInProgress(id: number): Promise<boolean> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return true;
  }

  public async updateMatch(id: number, homeTeam: number, awayTeam: number): Promise<boolean> {
    await this.model.update(
      { homeTeamGoals: homeTeam, awayTeamGoals: awayTeam },
      { where: { id } },
    );
    return true;
  }
}
