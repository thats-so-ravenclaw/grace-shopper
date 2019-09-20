/* global describe beforeEach afterEach it */

import MockAxiosAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { expect } from 'chai';
import { addToCart, addToCartThunk, getCart, getCartThunk } from './cart';
import { placeOrderThunk, placeNewOrder } from './cart';
import { ADD_ITEM_TO_CART, GET_CART, PLACE_NEW_ORDER } from './index';
import configureMockstore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

let store;
let mockAxios;
let mockStore = configureMockstore([thunkMiddleware]);

const wig = [
  {
    name: 'Test Wig',
    price: 20.1,
    quantity: 10,
    length: 'short',
    material: 'human',
    color: 'red'
  }
];

describe('Action creators', () => {
  describe('addToCart', () => {
    it('returns properly formatted action', () => {
      expect(addToCart(wig)).to.be.deep.equal({
        type: ADD_ITEM_TO_CART,
        item: wig
      });
    });
  });

  describe('getCart', () => {
    it('returns properly formatted action', () => {
      expect(getCart()).to.be.deep.equal({
        type: GET_CART
      });
    });
  });

  describe('placeNewOrder', () => {
    it('returns properly formatted action', () => {
      expect(placeNewOrder()).to.be.deep.equal({
        type: PLACE_NEW_ORDER
      });
    });
  });
});

describe('Thunks', () => {
  beforeEach(() => {
    mockAxios = new MockAxiosAdapter(axios);
    store = mockStore(wig);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('add to cart succeeds', () => {
    it('adds the received item on state', async () => {
      await store.dispatch(addToCartThunk(wig));
      const state = store.getState();
      expect(state).to.deep.equal([wig, wig]);
    });
  });

  describe('get cart succeeds', () => {
    it('gets the cart from state', async () => {
      await store.dispatch(getCartThunk());
      const state = store.getState();
      expect(state).to.deep.equal(wig);
    });
  });

  //this test was not passing, not sure why
  describe('place order clears cart', () => {
    const order = {
      total: 5,
      street: 'street',
      city: 'city',
      state: 'st',
      zip: 11111
    };
    const total = 100;
    it('clears the cart on state', async () => {
      await store.dispatch(placeOrderThunk(order, wig, total));
      const state = store.getState();
      expect(state).to.deep.equal([]);
    });
  });
});
