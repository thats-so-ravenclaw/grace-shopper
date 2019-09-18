/* global describe beforeEach afterEach it */

import MockAxiosAdapter from 'axios-mock-adapter';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import { expect } from 'chai';
import { gotWigs, GOT_ALL_WIGS, getAllWigs } from './wigs';
import thunkMiddleware from 'redux-thunk';
import enforceImmutableState from 'redux-immutable-state-invariant';
import { reducer } from './index';

let store;
let mockAxios;

const wigs = [
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
  describe('gotWigs', () => {
    it('returns properly formatted action', () => {
      expect(gotWigs(wigs)).to.be.deep.equal({
        type: GOT_ALL_WIGS,
        wigs
      });
    });
  });
});

describe('Thunks', () => {
  beforeEach(() => {
    mockAxios = new MockAxiosAdapter(axios);
    store = createStore(
      reducer,
      applyMiddleware(thunkMiddleware, enforceImmutableState())
    );
  });

  afterEach(() => {
    mockAxios.restore();
  });

  describe('GET /wigs succeeds', () => {
    beforeEach(() => {
      mockAxios.onGet('/api/wigs').reply(200, wigs);
    });

    it('sets the received wigs on state', async () => {
      await store.dispatch(getAllWigs());
      const state = store.getState();
      expect(state.wigs).to.deep.equal(wigs);
    });
  });
});
