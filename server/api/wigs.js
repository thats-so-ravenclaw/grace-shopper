const router = require('express').Router();
const { Wig } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const wigs = await Wig.findAll();
    res.json(wigs);
  } catch (error) {
    next(error);
  }
});
