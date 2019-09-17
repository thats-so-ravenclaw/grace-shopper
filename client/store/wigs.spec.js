/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { getAllWigs } from './wigs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import wigsReducer from './wigsReducer';
