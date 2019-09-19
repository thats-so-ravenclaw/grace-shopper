/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');
const agent = request.agent(app);

describe('Orders Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let data = {
    total: 49.33,
    street: '5 Hanover Sq',
    city: 'New York',
    state: 'NY',
    zip: '10001'
  };

  describe('/api/orders', () => {
    it('POST /api/orders', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send(data)
        .expect(201);

      expect(res.status).to.be.equal(201);
    });
  });
});
