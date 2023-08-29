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

  public async finishMatchesInProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.matchesService.finishMatchesInProgress(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(200).json({ message: 'Updated' });
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const {
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals,
    } = req.body;
    const match = await this.matchesService.createMatch(
      Number(homeTeamId),
      Number(awayTeamId),
      Number(homeTeamGoals),
      Number(awayTeamGoals),
    );
    return res.status(201).json(match);
  }
}
