import { SET_AUTH } from './types';

const initialState = {
  auth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};
