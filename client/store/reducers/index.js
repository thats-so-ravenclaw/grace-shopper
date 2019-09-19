import { combineReducers } from 'redux';
import user from './user';
import wigs from './wigs';

export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const GOT_ALL_WIGS = 'GOT_ALL_WIGS';
export const GOT_SINGLE_WIG = 'GOT_SINGLE_WIG';

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const GET_CART = 'GET_CART';
export const CART_ERROR = 'GET_CART_ERROR';

const rootReducer = combineReducers({
  user,
  wigs
});

export default rootReducer;
