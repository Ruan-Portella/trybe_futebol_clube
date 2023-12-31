import TeamsModel from '../model/TeamModel';
import ITemasModel from '../Interfaces/ITeamsModel';
import ITeams from '../Interfaces/ITeams';

export default class TeamService {
  constructor(
    private teamModel: ITemasModel = new TeamsModel(),
  ) {}

  public async findAll(): Promise<ITeams[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async findOne(id: number): Promise<ITeams | null> {
    const team = await this.teamModel.findOne(id);
    return team;
  }
}
