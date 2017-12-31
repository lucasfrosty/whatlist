import { USER_LOGIN, USER_LOGOFF } from './types';

const initialState = {
  auth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        auth: action.payload.auth,
        user: action.payload.user,
      };
    case USER_LOGOFF:
      return {
        ...state,
        auth: false,
        user: undefined,
      };
    default:
      return state;
  }
};
