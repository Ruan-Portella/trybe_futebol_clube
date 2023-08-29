export interface IMatchesModel {
  findAll(): Promise<unknown>;
  finishMatchesInProgress(id: number): Promise<boolean>;
}

export default IMatchesModel;
