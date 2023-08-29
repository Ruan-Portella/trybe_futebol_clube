import IUsers from './IUsers';

export interface IUsersModel {
  // findAll(): Promise<IUsers[]>;
  findOne(email: string): Promise<IUsers | null>;
  findById(id: string): Promise<IUsers | null>;
}

export default IUsersModel;
