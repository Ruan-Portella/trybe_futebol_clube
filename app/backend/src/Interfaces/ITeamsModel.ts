import ITeams from './ITeams';

export interface ITeamsModel {
  findAll(): Promise<ITeams[]>;
  findOne(id: number): Promise<ITeams | null>;
}

export default ITeamsModel;
