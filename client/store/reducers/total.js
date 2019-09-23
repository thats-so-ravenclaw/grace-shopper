import { GET_TOTAL, TOTAL_ERROR, REMOVE_FROM_TOTAL } from './index';

//ACTION CREATOR
export const addTotal = wigPrice => ({
  type: GET_TOTAL,
  wigPrice
});

const totalErrorAction = error => ({
  type: TOTAL_ERROR,
  error
});

export const removeFromTotal = price => ({
  type: REMOVE_FROM_TOTAL,
  price
});

//THUNK CREATOR
export const addTotalThunk = wigPrice => {
  return dispatch => {
    try {
      dispatch(addTotal(wigPrice));
    } catch (error) {
      dispatch(totalErrorAction(error));
    }
  };
};

export const updateTotalThunk = price => {
  return dispatch => {
    try {
      dispatch(removeFromTotal(price));
    } catch (error) {
      totalErrorAction(error);
    }
  };
};

//REDUCER
export default function total(state = [], action) {
  switch (action.type) {
    case GET_TOTAL: {
      let cost = action.wigPrice;
      let existingTotal = state;

      const updatedTotal =
        existingTotal.length !== 0
          ? existingTotal + cost
          : (existingTotal = cost);
      return updatedTotal;
    }
    case REMOVE_FROM_TOTAL: {
      let cost = action.price;
      let existingTotal = state;
      console.log('COST ', cost);

      const decreasedUpdatedTotal =
        existingTotal.length !== 0 ? existingTotal - cost : existingTotal;
      return decreasedUpdatedTotal;
    }
    default:
      return state;
  }
}

//PLEASE KEEP UNTIL WORKING

//Thunk creator to grab price direclty from backend
// export const addTotalThunk = wigId => {
//   console.log('TYPEOF', typeof wigId);
//   console.log('WIG ID', wigId);
//   return async dispatch => {
//     const { data } = await Axios.get(`/api/wigs/${wigId}`);
//     const wigPrice = data[0].price;

//     try {
//       dispatch(addTotal(wigPrice));
//     } catch (error) {
//       dispatch(totalErrorAction(error));
//     }
//   };
// };

// const updatedTotal =
//   existingTotal.length !== 0
//     ? existingTotal.reduce((acc, cost) => {
//         return acc + cost;
//       }, existingTotal[0])
//     : (existingTotal = [cost]);

// const updatedTotal =
//   existingTotal.length !== 0
//     ? existingTotal.reduce((acc, cost) => {
//         return (acc += cost);
//       }, existingTotal[0])
//     : ((existingTotal = cost), [existingTotal]);

// const updatedTotal =
//   state.length === 0
//     ? (state[0] = Number(action.price))
//     : state.reduce((acc, cost = Number(action.price)) => {
//         return (acc += cost);
//       }, state[0]);

// const updatedTotal =
//   state.length === 0
//     ? (state[0] = action.price)
//     : state[0] + action.price;

// if (existingTotal.length !== 0) {
//   existingTotal.reduce((acc, cost = action.price) => {
//     return (acc += cost);
//   }, 0);
// }

// const updatedTotal = existingTotal.reduce((acc, cost) => {
//   return acc + cost;
// }, existingTotal);
// const updatedTotal = existingTotal[0] + cost;
