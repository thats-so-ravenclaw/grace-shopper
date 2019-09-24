import {
  GET_TOTAL,
  TOTAL_ERROR,
  REMOVE_FROM_TOTAL,
  PLACE_NEW_ORDER
} from './index';

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
export default function total(state = 0, action) {
  switch (action.type) {
    case GET_TOTAL: {
      let cost = action.wigPrice;
      let existingTotal = state;

      const updatedTotal =
        existingTotal !== 0 ? existingTotal + cost : (existingTotal = cost);
      return updatedTotal;
    }
    case REMOVE_FROM_TOTAL: {
      let cost = action.price;
      let existingTotal = state;
      const decreasedUpdatedTotal =
        existingTotal !== 0 ? existingTotal - cost : '';
      return decreasedUpdatedTotal;
    }
    case PLACE_NEW_ORDER:
      return 0;
    default:
      return state;
  }
}
