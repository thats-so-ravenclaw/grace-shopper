const { expect } = require('chai');
const db = require('../index');
const LineItem = db.model('lineItem');

describe('LineItems model', () => {
  before(() => {
    return db.sync({ force: true });
  });

  let lineItem;
  beforeEach(() => {
    lineItem = LineItem.build({
      name: 'The Olsonton',
      price: 932.65,
      quantity: 25
    });
  });

  describe('attribute definitions', () => {
    it('includes name, price, quantity', async () => {
      const savedlineItem = await lineItem.save();
      expect(savedlineItem.name).to.equal('The Olsonton');
      expect(savedlineItem.price).to.equal(932.65);
      expect(savedlineItem.quantity).to.equal(25);
    });
  });
});
