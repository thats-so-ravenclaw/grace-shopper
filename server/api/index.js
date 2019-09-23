const router = require('express').Router();
module.exports = router;
const isAuthenticated = require('../security');

router.use(isAuthenticated);

router.use('/users', require('./users'));
router.use('/wigs', require('./wigs'));
router.use('/orders', require('./orders'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
