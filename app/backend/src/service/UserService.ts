import * as jwt from 'jsonwebtoken';
import UserModel from '../model/UserModel';
import IUserModel from '../Interfaces/IUsersModel';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  public async findOne(email: string): Promise<unknown> {
    const user = await this.userModel.findOne(email);
    if (!user) return { message: 'User not found' };
    const token = jwt.sign(email, process.env.JWT_SECRET as string);
    return { message: { token } };
  }
}
