import { USER_LOGIN, USER_LOGOFF } from './types';

// set auth actions
export function userLogin(payload) {
  return {
    payload,
    type: USER_LOGIN,
  };
}

export function userLogoff() {
  return {
    type: USER_LOGOFF,
  };
}
