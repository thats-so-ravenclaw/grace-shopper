/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Wig = db.model('wig');
const agent = request.agent(app);

describe('Wig Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let blondeWig;

  beforeEach(async () => {
    blondeWig = await Wig.create({
      name: 'Marilyn Monroe',
      price: 25.0,
      quantity: 2,
      length: 'short',
      material: 'human',
      color: 'blonde'
    });
    return blondeWig;
  });

  describe('/api/wigs/', () => {
    it('GET /api/wigs', async () => {
      const res = await request(app)
        .get('/api/wigs')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.be.equal('Marilyn Monroe');
    });
  }); // end describe('/api/users')
});
