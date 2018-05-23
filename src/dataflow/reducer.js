import { USER_LOGIN, USER_LOGOFF } from './types';

const initialState = {
  user: null,
};

function reducer(state = initialState, action) {
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
        user: null,
      };
    default:
      return state;
  }
}

export default reducer;
