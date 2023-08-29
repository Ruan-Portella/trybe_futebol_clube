import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import MatcherModel from '../database/models/MatchersModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', async () => {

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

  it('Testa se é retornado todos as partidas', async function () {
    sinon.stub(MatcherModel, 'findAll').resolves([
      {
        id: 1,
        homeTeamId: 16,
        homeTeamGoals: 1,
        awayTeamId: 15,
        awayTeamGoals: 0,
        inProgress: false,
        homeTeam: {
          teamName: 'São Paulo',
        },
        awayTeam: {
          teamName: 'Palmeiras',
        }
      },
    ] as any);
    const {status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
  });
  it('testa se retorna uma partida finalizada', async function () {
    sinon.stub(MatcherModel, 'findOne').resolves({
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 15,
      awayTeamGoals: 0,
      inProgress: false,
      homeTeam: {
        teamName: 'São Paulo',
      },
      awayTeam: {
        teamName: 'Palmeiras',
      }
    } as any);
    const {status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
  });

  it('testa se retorna uma partida não finalizada', async function () {
    sinon.stub(MatcherModel, 'findOne').resolves({
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 15,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: 'São Paulo',
      },
      awayTeam: {
        teamName: 'Palmeiras',
      }
    } as any);
    const {status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
  });

  it('Testa se é possível editar uma partida', async function () {
    const { status, body } = await chai.request(app).patch('/matches/1').set('authorization', 
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMzQ1MTM2fQ.bBz_tRzCPD3yPR6XppfnRF_IzkpXnDno1i80NMIVK_A').send({homeTeamGoals: 2, awayTeamGoals: 1});
    expect(body).to.be.an('object');
  })

  it('Testa se é possível editar uma partida', async function () {
    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('authorization', 
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMzQ1MTM2fQ.bBz_tRzCPD3yPR6XppfnRF_IzkpXnDno1i80NMIVK_A')
    expect(body).to.be.deep.equals({message: 'Finished'});
  })

  it('Testa se é possível criar uma partida', async function () {
    sinon.stub(MatcherModel, 'create').resolves({
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 15,
      awayTeamGoals: 0,
      inProgress: true,
    } as any);

    const { status, body } = await chai.request(app).post('/matches').set('authorization', 
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMzQ1MTM2fQ.bBz_tRzCPD3yPR6XppfnRF_IzkpXnDno1i80NMIVK_A').send({homeTeamId: 16, awayTeamId: 15, homeTeamGoals: 1, awayTeamGoals: 0});

    expect(status).to.be.equal(201);
    expect(body).to.be.an('object');
  });

  it('Testa se não é possível criar uma partida com time de id igual', async function () {
    sinon.stub(MatcherModel, 'create').resolves({
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 16,
      awayTeamGoals: 0,
      inProgress: true,
    } as any);

    const { status, body } = await chai.request(app).post('/matches').set('authorization', 
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMzQ1MTM2fQ.bBz_tRzCPD3yPR6XppfnRF_IzkpXnDno1i80NMIVK_A').send({homeTeamId: 16, awayTeamId: 16, homeTeamGoals: 1, awayTeamGoals: 0});

    expect(status).to.be.equal(422);
    expect(body).to.be.an('object');
  });

  it('Testa se não é possível criar uma partida com time que não existe', async function () {
    sinon.stub(MatcherModel, 'create').resolves({
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 16,
      awayTeamGoals: 0,
      inProgress: true,
    } as any);

    const { status, body } = await chai.request(app).post('/matches').set('authorization', 
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMzQ1MTM2fQ.bBz_tRzCPD3yPR6XppfnRF_IzkpXnDno1i80NMIVK_A').send({homeTeamId: 20, awayTeamId: 16, homeTeamGoals: 1, awayTeamGoals: 0});

    expect(status).to.be.equal(404);
    expect(body).to.be.an('object');
  });
});
