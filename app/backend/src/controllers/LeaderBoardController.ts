import { Request, Response } from 'express';
import LeaderBoardService from '../service/LeaderBoardService';

export default class TeamController {
  constructor(
    private matchesService = new LeaderBoardService(),
  ) {}

  public async getLeaderBoardHome(req: Request, res: Response): Promise<Response> {
    const leaderBoard = await this.matchesService.getLeaderBoardHome();
    return res.status(200).json(leaderBoard);
  }

  public async getLeaderBoardAway(req: Request, res: Response): Promise<Response> {
    const leaderBoard = await this.matchesService.getLeaderBoardAway();
    return res.status(200).json(leaderBoard);
  }

  public async getLeaderBoard(req: Request, res: Response): Promise<Response> {
    const leaderBoard = await this.matchesService.getLeaderBoard();
    return res.status(200).json(leaderBoard);
  }
}
