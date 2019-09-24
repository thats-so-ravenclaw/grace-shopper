import {
  ADD_ITEM_TO_CART,
  GET_CART,
  CART_ERROR,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART_ERROR,
  PLACE_NEW_ORDER,
  PLACE_ORDER_ERROR,
  UPDATE_WIGS_ERROR
} from './index';

// Using Axios to update the quantity in the database on checkout
// and to create an order in the database
import Axios from 'axios';

//action creators
export const addToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
});

export const getCart = () => ({
  type: GET_CART
});

export const removeFromCart = wigId => ({
  type: REMOVE_FROM_CART,
  wigId
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

export const removeFromCartError = error => ({
  type: REMOVE_FROM_CART_ERROR,
  error
});

export const updateWigsError = error => ({
  type: UPDATE_WIGS_ERROR,
  error
});

//thunk creators currently do not need to be async functions since we are not accessing the database
export const addToCartThunk = item => {
  return dispatch => {
    try {
      dispatch(addToCart(item));
    } catch (error) {
      dispatch(cartErrorAction(error));
    }
  };
};

export const getCartThunk = () => {
  return dispatch => {
    try {
      dispatch(getCart());
    } catch (error) {
      dispatch(cartErrorAction(error));
    }
  };
};

export const removeFromCartThunk = wigId => {
  return dispatch => {
    try {
      dispatch(removeFromCart(wigId));
    } catch (error) {
      dispatch(removeFromCartError(error));
    }
  };
};

export const updateWigsThunk = cart => {
  return async dispatch => {
    try {
      await Axios.put('/api/wigs/quantity', cart);
    } catch (error) {
      dispatch(updateWigsError(error));
    }
  };
};

export const placeOrderThunk = order => {
  return async dispatch => {
    try {
      const { data } = await Axios.post('/api/orders', order);
      // for updating line item associations down the line
      // if (!newCart) //add some error message if newCart doesn't exist
      dispatch(placeNewOrder());
    } catch (error) {
      dispatch(placeNewOrderError(error));
    }
  };
};

export default function cart(state = [], action) {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      const existingCart = [...state];
      // if there are item(s) already in the cart
      if (existingCart.length !== 0) {
        let isAlreadyInCart = false;
        // map through the cart and check if we already have that wig in the cart
        const updatedCart = existingCart.map(item => {
          // if there's already that wig in the cart
          if (item.id === action.item.id) {
            // then set isAlreadyInCart to true
            // and increase the quantity of that item in the cart
            isAlreadyInCart = true;
            item.cartQuantity += 1;
          }
          return item;
        });
        // if we increased the item's cartQuantity, then return the updatedCart array
        if (isAlreadyInCart) {
          return [...updatedCart];
        } else {
          // if the wig to add wasn't already in the cart, then create a cartQuantity property on the item
          let newItem = action.item;
          newItem.cartQuantity = 1;
          // add the new wig item to the array and return it
          return [...existingCart, newItem];
        }
      } else {
        // if there's nothing in the cart
        // add the cartQuantity to the item
        // and then add the item to the cart
        let newItem = action.item;
        newItem.cartQuantity = 1;
        return [newItem];
      }
    }
    case GET_CART:
      return state;
    case REMOVE_FROM_CART:
      let existingCart = [...state];
      return existingCart.filter(wig => action.wigId != wig.id);
    case PLACE_NEW_ORDER:
      return [];
    default:
      return state;
  }
}
