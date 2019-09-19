import {
  ADD_ITEM_TO_CART,
  GET_CART,
  CART_ERROR,
  PLACE_NEW_ORDER,
  PLACE_ORDER_ERROR
} from './index';

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

export const placeNewOrder = () => ({
  type: PLACE_NEW_ORDER
});

export const placeNewOrderError = error => ({
  type: PLACE_ORDER_ERROR,
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

export const placeOrderThunk = (order, cart, total) => {
  return async dispatch => {
    try {
      const idArray = cart.map(item => item.id);
      const newCart = await Axios.put('/api/wigs/quantity', idArray);
      const newOrder = await Axios.post('/api/orders', order); // for updating line item associations down the line
      // if (!newCart) //add some error message if newCart doesn't exist
      dispatch(placeNewOrder());
    } catch (error) {
      dispatch(placeNewOrderError(error));
    }
  };
};

export default function cart(state = [], action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.item];
    case GET_CART:
      return state;
    case PLACE_NEW_ORDER:
      return [];
    default:
      return state;
  }
}
