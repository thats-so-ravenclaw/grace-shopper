/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { gotWigs, GOT_ALL_WIGS } from './wigs';
import thunkMiddleware from 'redux-thunk';

const wig = [
  {
    name: 'Test Wig',
    price: 20.1
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
