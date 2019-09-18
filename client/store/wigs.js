import axios from 'axios';

//ACTION TYPES
export const GOT_ALL_WIGS = 'GOT_ALL_WIGS';
export const GOT_SINGLE_WIG = 'GOT_SINGLE_WIG';

//ACTION CREATORS
export const gotWigs = wigs => ({
  type: GOT_ALL_WIGS,
  wigs
});

export const gotSingleWig = () => ({
  type: GOT_SINGLE_WIG
});

//THUNK CREATOR
export const getAllWigs = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/wigs');
    dispatch(gotWigs(data));
  } catch (error) {
    console.log(error);
  }
};

//REDUCER
export default function wigsReducer(wigs = [], action) {
  switch (action.type) {
    case GOT_ALL_WIGS:
      return action.wigs;
    case GOT_SINGLE_WIG:
      return action.wig;

    default:
      return wigs;
  }
}
