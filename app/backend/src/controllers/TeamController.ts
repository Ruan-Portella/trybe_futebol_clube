import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  constructor(
    private teamsService = new TeamService(),
  ) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamsService.findAll();
    return res.status(200).json(teams);
  }
}
