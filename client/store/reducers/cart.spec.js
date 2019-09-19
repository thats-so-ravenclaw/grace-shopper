/* global describe beforeEach afterEach it */

import MockAxiosAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { expect } from 'chai';
import { addToCart, addToCartThunk, getCart, getCartThunk } from './cart';
import { ADD_ITEM_TO_CART, GET_CART } from './index';
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
    // beforeEach(() => {
    //   mockAxios.onGet('/api/wigs').reply(200, wig);
    // });

    it('adds the received item on state', async () => {
      await store.dispatch(addToCartThunk());
      const state = store.getState();
      expect(state).to.deep.equal(wig);
    });
  });

  describe('get cart succeeds', () => {
    // beforeEach(() => {
    //   mockAxios.onGet('/api/wigs').reply(200, wig);
    // });

    it('gets the cart from state', async () => {
      await store.dispatch(getCartThunk());
      const state = store.getState();
      expect(state).to.deep.equal(wig);
    });
  });
});
