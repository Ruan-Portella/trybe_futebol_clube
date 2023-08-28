import TeamsModel from '../database/models/TeamsModel';
import ITemasModel from '../Interfaces/ITeamsModel';
import ITeams from '../Interfaces/ITeams';

export default class TeamModel implements ITemasModel {
  private model = TeamsModel;

  public async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async findOne(id: number): Promise<ITeams | null> {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}
