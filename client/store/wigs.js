import Axios from 'axios';

//ACTION TYPES
export const GOT_ALL_WIGS = 'GOT_ALL_WIGS';
export const GOT_SINGLE_WIG = 'GOT_SINGLE_WIG';

//remove wig from cart? placeholder
// export const REMOVE_WIG

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
    const { data } = await Axios.get('/api/wigs');
    dispatch(gotWigs(data));
  } catch (error) {
    console.log(error);
  }
};
