import { UserAction } from '../constants/actions';

export default () => next => action => {
  const { type, payload } = action;

  if (type === UserAction.AUTHENTICATE_USER_SUCCESS) {
    // If access token is present, update it to local storage
    if (payload && payload.access_token) {
      localStorage.setItem('accessToken', payload.access_token);
    }
  }

  if (type === UserAction.LOGOUT_USER) {
    localStorage.removeItem('accessToken');
  }

  // Continue with the action
  next(action);
};
