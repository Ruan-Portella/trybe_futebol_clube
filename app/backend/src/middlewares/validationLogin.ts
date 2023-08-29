import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface token extends Request {
  token?: object;
}
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

  static async validateEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      return res.status(401).json(
        { message: 'Invalid email or password' },
      );
    }
    next();
  }

  static async validatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { password } = req.body;
    if (password.length < 6) {
      return res.status(401).json(
        { message: 'Invalid email or password' },
      );
    }
    next();
  }

  static async validateToken(
    req: token,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const tokenWithoutBearer = authorization.replace('Bearer ', '');
      const token = await jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET as string);
      req.token = token as object;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
