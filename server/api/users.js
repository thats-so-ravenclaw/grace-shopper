const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;
const { isAdmin, isUser } = require('../security');

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', isUser, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await User.findOne({
      where: {
        id: id
      },
      attributes: ['id', 'email']
    });
    if (!user) {
      res.sendStatus(404);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});
