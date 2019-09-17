const router = require('express').Router();
const { Wigs } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const wigs = await User.findAll();
    res.json(wigs);
  } catch (error) {
    next(error);
  }
});
