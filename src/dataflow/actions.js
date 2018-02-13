import { USER_LOGIN, USER_LOGOFF } from './types';

// set auth actions
export const userLogin = payload => ({
  type: USER_LOGIN,
  payload,
});

export const userLogoff = () => ({
  type: USER_LOGOFF,
});
