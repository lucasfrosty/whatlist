import { SET_LOGGED_INFO } from './types';

const initialState = {
  isLogged: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_INFO:
      return {
        ...state,
        isLogged: action.payload,
      };
    default:
      return state;
  }
};
