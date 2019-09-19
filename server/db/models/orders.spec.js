const { expect } = require('chai');
const db = require('../index');
const Order = db.model('order');

describe('Orders model', () => {
  before(() => {
    return db.sync({ force: true });
  });

  let order;
  beforeEach(() => {
    order = Order.build({
      status: 'pending',
      total: 600.05,
      street: '5 Hanover Sq',
      city: 'New York',
      state: 'NY',
      zip: '10001'
    });
  });

  describe('attribute definitions', () => {
    it('includes status, total', async () => {
      const savedOrder = await order.save();
      expect(savedOrder.status).to.equal('pending');
      expect(savedOrder.total).to.equal(600.05);
    });
  });
});
