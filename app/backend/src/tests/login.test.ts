import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import UserModel from '../database/models/UsersModel';
import { password } from '../database/config/database';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users', () => {

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

  it('Testa se é possível logar com token correto', async function () {
    sinon.stub(UserModel, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
   } as any);
   sinon.stub(bcrypt, 'compare').resolves(true);
   sinon.stub(jwt, 'verify').resolves({id: 1});

    const {status, body} = await chai.request(app).get('/login/role')
    .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMjcyODg2fQ.24Q0UMkpEMWyI27kuJTsZ7kMOOM_z22z3l-VmsZK6mg');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({role: 'admin'});
  });

  it('Testa se não é possível logar com token correto', async function () {
    sinon.stub(UserModel, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
   } as any);
   sinon.stub(bcrypt, 'compare').resolves(true);
   sinon.stub(jwt, 'verify').rejects(new Error());

    const {status, body} = await chai.request(app).get('/login/role')
    .set('authorization', 'Bearer bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMjcyODg2fQ.24Q0UMkpEMWyI27kuJTsZ7kMOOM_z22z3l-VmsZK6mg');
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Token must be a valid token'});
  });

  it('Testa se não é possível logar sem token', async function () {
    sinon.stub(UserModel, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
   } as any);
   sinon.stub(bcrypt, 'compare').resolves(true);
   sinon.stub(jwt, 'verify').rejects(new Error());

    const {status, body} = await chai.request(app).get('/login/role')
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({message: 'Token not found'});
  });

  it('Testa se não tiver email retorna erro', async function () {
    const { status, body } = await chai.request(app).post('/login').send({
      password: 'secret_admin'
    });

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  })

  it('Testa se não tiver senha retorna erro', async function () {
    const { status, body } = await chai.request(app).post('/login').send({
      email: ''
    });

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testa se manda email errado retorna erro', async function () {
    const { status, body } = await chai.request(app).post('/login').send({
      email: 'ruan@gmail',
      password: 'secret_admin'
    });

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

  it('Testa  se manda senha errado retorna erro', async function () {
    const { status, body } = await chai.request(app).post('/login').send({
      email: 'ruanmorales29@gmail.com',
      password: '1234',
    });

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

  it('Testa se a senha fornecida não bate com o banco', async function () {
    const mock = UserModel.build({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    })

    sinon.stub(UserModel, 'findOne').resolves(mock);
    sinon.stub(bcrypt, 'compare').resolves(false);

    const { status, body } = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '1234567',
    });

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  })

  it('Testa se não encontra um usuário no banco', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);
    sinon.stub(jwt, 'verify').resolves()
    
    const { status, body } = await chai.request(app).get('/login/role').set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzMjcyODg2fQ.24Q0UMkpEMWyI27kuJTsZ7kMOOM_z22z3l-VmsZK6mg');

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'missing auth token' });
  })
});
