import UsersModel from '../database/models/UsersModel';
import { IUsersModel } from '../Interfaces/IUsersModel';
import IUsers from '../Interfaces/IUsers';

export default class UserModel implements IUsersModel {
  private model = UsersModel;

  public async findOne(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
