import { Request, Response } from 'express';
import UserService from '../service/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async findOne(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const user = await this.userService.findOne(email) as { message: string };
    return res.status(200).json(user.message);
  }
}
