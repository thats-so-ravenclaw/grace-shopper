import { GET_TOTAL, TOTAL_ERROR } from './index';

import Axios from 'axios';

//ACTION CREATOR
export const addTotal = eachItemSubtotal => ({
  type: GET_TOTAL,
  eachItemSubtotal
});

const totalErrorAction = error => ({
  type: TOTAL_ERROR,
  error
});

//THUNK CREATOR
export const addTotalThunk = itemPrice => {
  return dispatch => {
    const eachItemSubtotal = itemPrice;
    try {
      dispatch(addTotal(eachItemSubtotal));
    } catch (error) {
      dispatch(totalErrorAction(error));
    }
  };
};

export default function total(state = [], action) {
  switch (action.type) {
    case GET_TOTAL: {
      let cost = action.eachItemSubtotal;
      let existingTotal = state;

      const updatedTotal =
        existingTotal.length !== 0
          ? existingTotal + cost
          : (existingTotal = cost);

      return updatedTotal;
    }
    default:
      return state;
  }
}

//PLEASE KEEP UNTIL WORKING

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
