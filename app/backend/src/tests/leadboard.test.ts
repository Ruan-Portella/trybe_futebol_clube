import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import matcherModel from '../database/models/MatchersModel';
import teamModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('LeadBoard', async () => {

  beforeEach(() => {
    sinon.restore();
  });
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  it('Testa se é possível listar todos os times', async () => {
    const match = matcherModel.build({
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 0,
      inProgress: false,
    });
    const team1 = teamModel.build({
      id: 1,
      teamName: 'São Paulo',
    });
    const team2 = teamModel.build({
      id: 2,
      teamName: 'Palmeiras',
    });

    sinon.stub(teamModel, 'findAll').resolves([team1, team2]);
    sinon.stub(matcherModel, 'findAll').resolves([match]);

    const { status, body } = await chai.request(app).get('/leaderboard');

    expect(status).to.equal(200);
    expect(body).to.have.deep.equal([
      {name: 'São Paulo', totalPoints: 3, totalGames: 1, totalVictories: 1, totalDraws: 0, totalLosses: 0, goalsFavor: 1, goalsOwn: 0, goalsBalance: 1, efficiency: '100.00'},
      {name: 'Palmeiras', totalPoints: 0, totalGames: 1, totalVictories: 0, totalDraws: 0, totalLosses: 1, goalsFavor: 0, goalsOwn: 1, goalsBalance: -1, efficiency: '0.00'}]
      );
});
});
