import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';

import { Response } from 'superagent';
import Team from '../Interfaces/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

   let chaiHttpResponse: Response;

  //  before(async () => {
  //    sinon
  //      .stub(Team, "findOne")
  //      .resolves({} as Team);
  //  });

  //  after(()=>{
  //    (Team.findOne as sinon.SinonStub).restore();
  //   })

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

});
