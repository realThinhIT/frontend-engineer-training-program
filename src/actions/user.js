import { UserAction } from '../constants/actions';
import request from '../utils/request';

export const fetchCurrentUser = () => ({
  type: UserAction.FETCH_CURRENT_USER,
  promise: request('/me')
});

export const registerUser = userData => ({
  type: UserAction.REGISTER_USER,
  promise: request('/registrations', 'POST', userData)
});

export const authenticateUser = userData => ({
  type: UserAction.AUTHENTICATE_USER,
  promise: request('/login', 'POST', userData)
});

export const logoutUser = () => ({
  type: UserAction.LOGOUT_USER
});
