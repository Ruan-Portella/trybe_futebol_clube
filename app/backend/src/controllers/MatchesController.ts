import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class TeamController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const matches = await this.matchesService.findAll();
    return res.status(200).json(matches);
  }
}
