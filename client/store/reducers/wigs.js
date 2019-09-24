import axios from 'axios';
import { GOT_ALL_WIGS, GOT_SINGLE_WIG, PLACE_NEW_ORDER } from './index';

//ACTION CREATORS
export const gotWigs = wigs => ({
  type: GOT_ALL_WIGS,
  wigs
});

export const gotSingleWig = () => ({
  type: GOT_SINGLE_WIG
});

//THUNK CREATOR
export const getAllWigs = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/wigs');
      dispatch(gotWigs(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
export default function wigs(state = [], action) {
  switch (action.type) {
    case GOT_ALL_WIGS:
      return action.wigs;
    // case GOT_SINGLE_WIG:
    //   return action.wig; //this will currently delete all wigs and replace the array with just one element - need to refactor
    default:
      return state;
  }
}
