const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const oneOrder = await Order.create({
      status: 'fulfilled',
      total: req.body.total
    });
    if (oneOrder) {
      res.status(201).send('Order successfully created.');
    } else {
      res.status(400).send('Order not created.');
    }
  } catch (err) {
    next(err);
  }
});
