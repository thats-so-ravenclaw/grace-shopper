// import { PLACE_NEW_ORDER, PLACE_ORDER_ERROR } from './index';
// import Axios from 'axios';

// export const placeNewOrder = idArray => ({
//   type: PLACE_NEW_ORDER,
//   idArray
// });

// export const placeNewOrderError = error => ({
//   type: PLACE_ORDER_ERROR,
//   error
// });

// export const placeOrderThunk = (order, cart, total) => {
//   return async dispatch => {
//     try {
//       const idArray = cart.map(item => item.id);
//       const newCart = await Axios.put('/api/wigs/quantity', cart);
//       // const newOrder = await Axios.post('/api/orders', order); // for updating line item associations down the line
//       // if (!newCart) //add some error message if newCart doesn't exist
//       dispatch(placeNewOrder(idArray));
//     } catch (error) {
//       dispatch(placeNewOrderError(error));
//     }
//   };
// };
