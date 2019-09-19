import { ADD_ITEM_TO_CART, GET_CART, CART_ERROR } from './index';

// for now we are not using axios, but we may use it if the cart will be stored in the database
// import axios from 'axios';

//action creators
export const addToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
});

export const getCart = () => ({
  type: GET_CART
});

const cartErrorAction = error => ({
  type: CART_ERROR,
  error
});

//thunk creators currently do not need to be async functions since we are not accessing the database
export const addToCartThunk = item => {
  return async dispatch => {
    try {
      dispatch(addToCart(item));
    } catch (error) {
      dispatch(cartErrorAction(error));
    }
  };
};

export const getCartThunk = () => {
  return async dispatch => {
    try {
      dispatch(getCart());
    } catch (error) {
      dispatch(cartErrorAction(error));
    }
  };
};

export default function cart(state = [], action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.item];
    case GET_CART:
      return state;
    default:
      return state;
  }
}
