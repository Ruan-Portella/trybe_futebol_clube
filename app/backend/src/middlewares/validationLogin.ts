import { Request, Response, NextFunction } from 'express';

export default class ValidateLogin {
  static async validate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(
        { message: 'All fields must be filled' },
      );
    }
    next();
  }
}
