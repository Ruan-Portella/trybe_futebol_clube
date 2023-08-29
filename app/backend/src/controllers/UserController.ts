import { Request, Response } from 'express';
import UserService from '../service/UserService';

interface token extends Request {
  token?: any;
}

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async findOne(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await this.userService.findOne(email, password) as
    { status: number, message: string };
    return res.status(user.status).json(user.message);
  }

  public async findById(req: token, res: Response): Promise<Response> {
    const { token } = req;
    const user = await this.userService.findById(token.id) as { status: number, message: string };
    return res.status(user.status).json(user.message);
  }
}
