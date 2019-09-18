import axios from 'axios';
import history from '../../history';
import { GET_USER, REMOVE_USER } from './index';

/**
 * ACTION CREATORS
 */
export const getUser = user => ({
  type: GET_USER,
  user
});

export const removeUser = () => ({
  type: REMOVE_USER
});

/**
 * THUNK CREATORS
 */
export const me = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/auth/me');
      dispatch(getUser(res.data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const auth = (email, password, method) => {
  return async dispatch => {
    let res;
    try {
      res = await axios.post(`/auth/${method}`, { email, password });
    } catch (authError) {
      return dispatch(getUser({ error: authError }));
    }

    try {
      dispatch(getUser(res.data));
      history.push('/home');
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr);
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      await axios.post('/auth/logout');
      dispatch(removeUser());
      history.push('/login');
    } catch (err) {
      console.error(err);
    }
  };
};

/**
 * REDUCER
 */
export default function user(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return state;
    default:
      return state;
  }
}
