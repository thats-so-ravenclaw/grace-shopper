import Axios from 'axios';

//ACTION TYPES
const GOT_ALL_WIGS = 'GOT_ALL_WIGS';
const GOT_SINGLE_WIG = 'GOT_SINGLE_WIG';

//remove wig from cart? placeholder
// export const REMOVE_WIG

//INITIAL STATE
const defaultWigs = [];

//ACTION CREATORS
const gotWigs = wigs => ({
  type: GOT_ALL_WIGS,
  wigs
});

const gotSingleWig = () => ({
  type: GOT_SINGLE_WIG
});

//THUNK CREATOR
export const getAllWigs = () => async dispatch => {
  try {
    const { data } = await Axios.get('/api/wigs');
    dispatch(gotWigs(data));
  } catch (error) {
    console.log(error);
  }
};

//REDUCER
export default function(state = defaultWigs, action) {
  switch (action.type) {
    case GOT_ALL_WIGS:
      return {
        ...state,
        wigs: action.wigs
      };
    case GOT_SINGLE_WIG:
      return {
        ...state,
        wig: action.wig
      };
    default:
      return state;
  }
}
