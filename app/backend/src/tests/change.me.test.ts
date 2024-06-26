import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import UsersModel from '../database/models/UsersModel';
import { Response } from 'superagent';
import Team from '../Interfaces/Team';
import MatchesModel from '../database/models/MatchesModel';



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
      
      it('deve retornar uma lista de partidas', async function () {
        const matches = [
          {
            id: 1,
            homeTeam: {
              teamName: 'Avaí/Kindermann',
            },
            awayTeam: {
              teamName: 'Bahia',
            },
            homeTeamGoals: 1,
            awayTeamGoals: 1,
            inProgress: false,
          },
          {
            id: 2,
            homeTeam: {
              teamName: 'Botafogo',
            },
            awayTeam: {
              teamName: 'Corinthians',
            },
            homeTeamGoals: 1,
            awayTeamGoals: 1,
            inProgress: false,
          },
        ];
        sinon.stub(MatchesModel, 'findAll').resolves(matches as any);
        const response =  chaiHttpResponse = await chai
          .request(app)
          .get('/matches')
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal(matches);
      })
      it('deve finalizar a partida', async () => {
        sinon.stub(jwt, 'verify');
        const match = { 
          update: sinon.stub().resolves({}),
          id: 1,
          homeTeam: {
            teamName: 'Avaí/Kindermann',
          },
          awayTeam: {
            teamName: 'Bahia',
          },
          homeTeamGoals: 1,
          awayTeamGoals: 1,
          inProgress: true,
        };

        sinon.stub(MatchesModel, 'findByPk').resolves(match as any);
        const response =  chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1/finish')
          .auth('token', { type: 'bearer' });

        expect(response.status).to.be.equal(200);
        expect(response.body.message).to.equal('Finished');
      });
      
      it ('deve atualizar o numero de gols da partida', async () => {
        sinon.stub(jwt, 'verify');

        const match = { 
          update: sinon.stub().resolves({}),
          id: 1,
          homeTeam: {
            teamName: 'Avaí/Kindermann',
          },
          awayTeam: {
            teamName: 'Bahia',
          },
          homeTeamGoals: 1,
          awayTeamGoals: 1,
          inProgress: true,
        };
        sinon.stub(MatchesModel, 'findByPk').resolves(match as any);
        const response =  chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .auth('token', { type: 'bearer' })
          .send({ homeTeamGoals: 2, awayTeamGoals: 1 });
        expect(response.status).to.be.equal(200);
        expect(response.body.message).to.equal('Match result updated successfully');
      });
      it('deve retornar o total de pontos do LeaderboardHome', async function () {
        const mockMatchs =[
          { 
            dataValues: {
                homeTeam: {
                  teamName: 'Santos',
                },
                homeTeamGoals: 1,
                awayTeamGoals: 1,
              },
            },
            { 
              dataValues: {
                  homeTeam: {
                    teamName: 'Palmeiras',
                  },
                  homeTeamGoals: 1,
                  awayTeamGoals: 1,
                },
              },
            { 
              dataValues: {
                  homeTeam: {
                    teamName: 'Sao Paulo',
                  },
                  homeTeamGoals: 2,
                  awayTeamGoals: 1,
                },
              },
        ] 
        const leaderboardExpected = [
          {
            name: "Sao Paulo",
            totalPoints: 3,
            totalGames: 1,
            totalVictories: 1,
            totalDraws: 0,
            totalLosses: 0,
            goalsFavor: 2,
            goalsOwn: 1,
            goalsBalance: 1,
            efficiency: "100.00"
          },
          {
            name: "Santos",
            totalPoints: 1,
            totalGames: 1,
            totalVictories: 0,
            totalDraws: 1,
            totalLosses: 0,
            goalsFavor: 1,
            goalsOwn: 1,
            goalsBalance: 0,
            efficiency: "33.33"
          },
          {
            name: "Palmeiras",
            totalPoints: 1,
            totalGames: 1,
            totalVictories: 0,
            totalDraws: 1,
            totalLosses: 0,
            goalsFavor: 1,
            goalsOwn: 1,
            goalsBalance: 0,
            efficiency: "33.33"
          },
        ]
        
        sinon.stub(MatchesModel, 'findAll').resolves(mockMatchs as any);
        const response =  chaiHttpResponse = await chai
          .request(app)
          .get('/leaderboard/home')
        
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal(leaderboardExpected);
      });
      it('deve retornar o total de pontos do LeaderboardAway', async function () {
        const mockMatchs =[
          { 
            dataValues: {
                awayTeam: {
                  teamName: 'Santos',
                },
                homeTeamGoals: 1,
                awayTeamGoals: 1,
              },
            },
            { 
              dataValues: {
                  awayTeam: {
                    teamName: 'Palmeiras',
                  },
                  homeTeamGoals: 1,
                  awayTeamGoals: 1,
                },
              },
            { 
              dataValues: {
                  awayTeam: {
                    teamName: 'Sao Paulo',
                  },
                  homeTeamGoals: 1,
                  awayTeamGoals: 2,
                },
              },
        ] 
        const leaderboardExpected = [
          {
            name: "Sao Paulo",
            totalPoints: 3,
            totalGames: 1,
            totalVictories: 1,
            totalDraws: 0,
            totalLosses: 0,
            goalsFavor: 2,
            goalsOwn: 1,
            goalsBalance: 1,
            efficiency: "100.00"
          },
          {
            name: "Santos",
            totalPoints: 1,
            totalGames: 1,
            totalVictories: 0,
            totalDraws: 1,
            totalLosses: 0,
            goalsFavor: 1,
            goalsOwn: 1,
            goalsBalance: 0,
            efficiency: "33.33"
          },
          {
            name: "Palmeiras",
            totalPoints: 1,
            totalGames: 1,
            totalVictories: 0,
            totalDraws: 1,
            totalLosses: 0,
            goalsFavor: 1,
            goalsOwn: 1,
            goalsBalance: 0,
            efficiency: "33.33"
          },
        ]
        
        sinon.stub(MatchesModel, 'findAll').resolves(mockMatchs as any);
        const response =  chaiHttpResponse = await chai
          .request(app)
          .get('/leaderboard/away')
        
        expect(response.status).to.be.equal(200);
        expect(response.body).to.deep.equal(leaderboardExpected);
      });
  });
