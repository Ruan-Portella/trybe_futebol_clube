import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {

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

  it('Testa se é retornado todos os times', async function () {
    sinon.stub(TeamsModel, 'findAll').resolves([
      {
        id: 1,
        name: 'Team 1',
      },
      {
        id: 2,
        name: 'Team 2',
      }
    ] as any);
    const {status, body} = await chai.request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal([
      {
        id: 1,
        name: 'Team 1',
      },
      {
        id: 2,
        name: 'Team 2',
      }
    ]);
  });

  it('Testa se é retornado um time', async function () {
    sinon.stub(TeamsModel, 'findOne').resolves({
      id: 1,
      name: 'Team 1',
    } as any);
    const {status, body} = await chai.request(app).get('/teams/1');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({
      id: 1,
      name: 'Team 1',
    });
  });

  it('Testa se não é retornado um time', async function () {
    sinon.stub(TeamsModel, 'findOne').resolves(null);
    const {status, body} = await chai.request(app).get('/teams/8');
    expect(status).to.be.equal(200);
    expect(body).to.be.equal(null);
  });
});
