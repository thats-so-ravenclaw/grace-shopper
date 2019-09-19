import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
export default createStore(rootReducer, middleware);
export * from './reducers/user';
