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

router.put('/quantity', async (req, res, next) => {
  try {
    //
    console.log(req.body);
    //
    let ids = req.body.map(item => {
      return item.id;
    });
    const wigs = await Wig.findByIds(ids);
    console.log(wigs);

    // // Before we can update each Wig's quantity in the database, we first need to check that all Wigs in the order have sufficient stock/quantity available to fulfill our order
    const stockNotAvailable = wigs
      .map((oneWig, idx) => {
        let id = oneWig.dataValues.id;
        return oneWig.checkQuantity();
      })
      .includes(false);

    // // if there is stock available
    // if (!stockNotAvailable) {
    //   // Map through the wigs array, update the wig in the database with the new quantity, and then return the updated wig object
    //   const updatedWigs = wigs.map(async wig => {
    //     let newQuantity = wig.getReducedQuantity(wigAndQuantity[wig.id]);
    //     const [numRows, affectedRow] = await Wig.update(
    //       {
    //         quantity: newQuantity
    //       },
    //       {
    //         where: {
    //           id: wig.id
    //         },
    //         returning: true,
    //         plain: true
    //       }
    //     );
    //     // return the updated wig instance to the new map
    //     // return affectedRow[0];
    //     return affectedRow.dataValues;
    //   });
    //   // send the updatedWigs array so the reducer can update the store
    //   res.status(200).json(updatedWigs);
    // } else {
    //   // If there isn't stock available, send an error that the order can't be completed.
    //   // A better version of this would indicate exactly which wig(s) are out of stock.
    //   res.status(409).send('One or more items in your cart are out of stock.');
    // }
  } catch (err) {
    next(err);
  }
});

// router.put('/quantity', async (req, res, next) => {
//   try {
//     console.log('req.body.ids :', req.body);
//     // cache {wigId: orderQuantity}
//     let wigAndQuantity = {};
//     // req.body is an array of potentially repeating wig ids, with repeated ids indicating that the order contains an additional quantity of that wig
//     req.body.forEach(wigId => {
//       // if the wig id repeats, then increase the order quantity in the cache above
//       if (wigAndQuantity[wigId]) {
//         wigAndQuantity[wigId]++;
//       } else {
//         wigAndQuantity[wigId] = 1;
//       }
//     });
//     console.log(wigAndQuantity);
//     // Get an array of Wig objects to update
//     const wigs = await Wig.findByIds(req.body);

//     // Before we can update each Wig's quantity in the database, we first need to check that all Wigs in the order have sufficient stock/quantity available to fulfill our order
//     const stockNotAvailable = wigs
//       .map(wig => {
//         return wig.checkQuantity(wigAndQuantity[wig.id]);
//       })
//       .includes(false);

//     // if there is stock available
//     if (!stockNotAvailable) {
//       // Map through the wigs array, update the wig in the database with the new quantity, and then return the updated wig object
//       const updatedWigs = wigs.map(async wig => {
//         let newQuantity = wig.getReducedQuantity(wigAndQuantity[wig.id]);
//         const [numRows, affectedRow] = await Wig.update(
//           {
//             quantity: newQuantity
//           },
//           {
//             where: {
//               id: wig.id
//             },
//             returning: true,
//             plain: true
//           }
//         );
//         // return the updated wig instance to the new map
//         // return affectedRow[0];
//         return affectedRow.dataValues;
//       });
//       // send the updatedWigs array so the reducer can update the store
//       res.status(200).json(updatedWigs);
//     } else {
//       // If there isn't stock available, send an error that the order can't be completed.
//       // A better version of this would indicate exactly which wig(s) are out of stock.
//       res.status(409).send('One or more items in your cart are out of stock.');
//     }
//   } catch (err) {
//     next(err);
//   }
// });
