const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    //if the user is undefined or the user id equals the request user id then this ok, otherwise, redirect to login
    if (req.user === undefined || req.body.user === req.user.id) {
      const oneOrder = await Order.create({
        status: 'submitted',
        total: req.body.total,
        name: req.body.name,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      });

      if (oneOrder) {
        // req.body.user will either be null (if a guest) or it'll be the user id (if user is logged in)
        oneOrder.setUser(req.body.user);
        res.status(201).send('Order successfully created.');
      } else {
        res.status(400).send('Order not created.');
      }
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    next(err);
  }
});
