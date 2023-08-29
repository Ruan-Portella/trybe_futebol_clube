import IMatches from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  finishMatchesInProgress(id: number): Promise<boolean>;
  updateMatch(id: number, homeTeam: number, awayTeam: number): Promise<boolean>;
}

export default IMatchesModel;
