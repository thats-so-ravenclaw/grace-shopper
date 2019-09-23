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

router.get('/:wigId', async (req, res, next) => {
  try {
    const SingleWig = await Wig.findAll({
      where: {
        id: req.params.wigId
      }
    });

    if (SingleWig) {
      res.json(SingleWig);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/quantity', async (req, res, next) => {
  try {
    // cache {wigId: cartQuantity}
    const idAndCartQuantity = {};

    // Map through the cart, cache the wigId and associated cartQuantity in object above, and then return the id of the wig
    let ids = req.body.map(item => {
      idAndCartQuantity[item.id] = item.cartQuantity;
      return item.id;
    });

    // Pass the array of ids to the database to get the most up-to-date stock/quantity available
    const wigs = await Wig.findByIds(ids);

    // Before we can update each Wig's quantity in the database, we first need to check that all Wigs in the order have sufficient stock/quantity available to fulfill our order
    const stockNotAvailable = wigs
      .map(wig => {
        let wigId = wig.dataValues.id.toString();
        return wig.checkQuantity(idAndCartQuantity[wigId]);
      })
      .includes(false);

    // if there is stock available
    if (!stockNotAvailable) {
      // Map through the wigs array, update the wig in the database with the new quantity, and then return the updated wig object
      const updatedWigs = wigs.map(async wig => {
        let wigId = wig.dataValues.id.toString();
        let newQuantity = wig.getReducedQuantity(idAndCartQuantity[wigId]);
        const [numRows, affectedRow] = await Wig.update(
          {
            quantity: newQuantity
          },
          {
            where: {
              id: wig.id
            },
            returning: true,
            plain: true
          }
        );
        return affectedRow;
      });
      res.status(200).send('Wigs were successfully updated');
    } else {
      // If there isn't stock available, send an error that the order can't be completed.
      // A better version of this would indicate exactly which wig(s) are out of stock.
      res.status(409).send('One or more items in your cart are out of stock.');
    }
  } catch (err) {
    next(err);
  }
});
