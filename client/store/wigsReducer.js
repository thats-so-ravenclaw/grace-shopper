import { GOT_ALL_WIGS, GOT_SINGLE_WIG } from './wigs';

const wigsReducer = (state = [], action) => {
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
};

export default wigsReducer;
