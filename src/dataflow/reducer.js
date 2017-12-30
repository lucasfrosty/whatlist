import { SET_AUTH } from './types';

const initialState = {
  auth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        user: action.payload.user,
        auth: action.payload.auth,
      };
    default:
      return state;
  }
};
