/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');
const agent = request.agent(app);

describe('User Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  const codysEmail = 'cody@puppybook.com';
  let cody;

  beforeEach(async () => {
    cody = await User.create({
      email: codysEmail
    });
    return cody;
  });

  describe('/api/users/', () => {
    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].email).to.be.equal(codysEmail);
    });
  }); // end describe('/api/users')

  describe('GET /api/users/:id', () => {
    it('retrieves a single user by their id', () => {
      return agent
        .get(`/api/users/${cody.id}`)
        .expect(200)
        .expect(res => {
          if (typeof res.body === 'string') res.body = JSON.parse(res.body);
          expect(res.body.email).to.equal(codysEmail);
        });
    });

    it('responds with a 404 if a user does not exist', () => {
      return agent.get('/api/users/09432').expect(404);
    });
  }); //end describe ('/api/users/:id')
}); // end describe('User routes')
