import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import UsersModel from '../database/models/UsersModel';

import { Response } from 'superagent';
import Team from '../Interfaces/Team';


chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

   let chaiHttpResponse: Response;

  // before(async () => {
  //    sinon
  //      .stub(Team, "findOne")
  //      .resolves({} as Team);
  //  });

  afterEach(function () {
    sinon.restore();
  });

  it('Retorna a lista completa de times!', async () => {
    const times: Team[] = 
      [
        { id: 1,
          teamName: 'Avaí/Kindermann',
        },
        { id: 2,
          teamName: 'Bahia',
        },
        { id: 3,
          teamName: 'Botafogo',
        },
    ]
  
    sinon.stub(TeamsModel, 'findAll').resolves(times as any);
    const response =  chaiHttpResponse = await chai
       .request(app)
       .get('/teams')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(times);
 });

 it('deve retornar o token', async function () {
  process.env.JWT_SECRET = 'your_test_secret';

  const userCredentials =
   {
    email: 'admin@admin.com',
    password: 'loopyy',
   };
   
   const user = {
    id: 1,
    password:  bcrypt.hashSync(userCredentials.password),
   }
  
   sinon.stub(UsersModel, 'findOne').resolves({ dataValues: user } as any);
   const response =  chaiHttpResponse = await chai
  
       .request(app)
       .post('/login')
       .send(userCredentials)
  
    expect(response.status).to.be.equal(200);   
    expect(response.body.token).to.be.not.undefined
 })
 it('deve responder com status 401, quando não existir usuário com email', async function () {
  const userCredentials =
   {
    email: 'admin@admin.com',
    password: 'loopyy',
   };
   
   sinon.stub(UsersModel, 'findOne').resolves(undefined);
   const response =  chaiHttpResponse = await chai
  
       .request(app)
       .post('/login')
       .send(userCredentials)
  
    expect(response.status).to.be.equal(401);   
    expect(response.body.message).to.equal('Invalid email or password');
  })

  it('deve responder com status 401, quando existir usuário com email inválido', async function () {
    const userCredentials =
     {
      email: 'admin@.com',
      password: 'loopyy',
     };
     
     const response =  chaiHttpResponse = await chai
    
         .request(app)
         .post('/login')
         .send(userCredentials)
    
      expect(response.status).to.be.equal(401);   
      expect(response.body.message).to.equal('Invalid email or password');
    })
    it('deve responder com status 401, quando existir usuário com password invalido', async function () {
      const userCredentials =
       {
        email: 'admin@admin.com',
        password: 'loopy',
       };
       
       const response =  chaiHttpResponse = await chai
      
           .request(app)
           .post('/login')
           .send(userCredentials)
      
        expect(response.status).to.be.equal(401);   
        expect(response.body.message).to.equal('Invalid email or password');
      })
      it('deve responder com status 401, quando não existir token', async function () {
       
        
         const response =  chaiHttpResponse = await chai
        
             .request(app)
             .get('/login/role')
             
        
          expect(response.status).to.be.equal(401);   
          expect(response.body.message).to.equal('Token not found');
        })
      
  });

