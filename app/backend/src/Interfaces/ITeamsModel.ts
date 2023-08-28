import ITeams from './ITeams';

export interface ITeamsModel {
  findAll(): Promise<ITeams[]>;
}

export default ITeamsModel;
