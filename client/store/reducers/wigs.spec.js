/* global describe beforeEach afterEach it */

import MockAxiosAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { expect } from 'chai';
import { gotWigs, getAllWigs } from './wigs';
import { GOT_ALL_WIGS } from './index';
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
  describe('gotWigs', () => {
    it('returns properly formatted action', () => {
      expect(gotWigs(wig)).to.be.deep.equal({
        type: GOT_ALL_WIGS,
        wigs: wig
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

  describe('GET /wigs succeeds', () => {
    beforeEach(() => {
      mockAxios.onGet('/api/wigs').reply(200, wig);
    });

    it('sets the received wigs on state', async () => {
      await store.dispatch(getAllWigs());
      const state = store.getState();
      expect(state).to.deep.equal(wig);
    });
  });
});
