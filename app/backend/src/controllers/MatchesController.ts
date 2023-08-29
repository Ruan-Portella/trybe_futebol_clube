import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';

export default class TeamController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.findAll(inProgress as string);
    return res.status(200).json(matches);
  }
}
