import { fetchCurrentUser, registerUser, authenticateUser, logoutUser } from '../user';
import { UserAction } from '../../constants/actions';

describe('actions/user test', () => {
  const { store } = global;

  beforeEach(() => {
    const response = {
      test: 'test'
    };
    fetch.mockResponse(JSON.stringify(response));

    store.clearActions();
  });

  it('should call FETCH_CURRENT_USER', async () => {    
    await store.dispatch(fetchCurrentUser());
    const actions = store.getActions();

    expect(actions[0].type).toBe(UserAction.FETCH_CURRENT_USER);
  });

  it('should call REGISTER_USER', async () => {
    await store.dispatch(registerUser());
    const actions = store.getActions();

    expect(actions[0].type).toBe(UserAction.REGISTER_USER);
  });

  it('should call AUTHENTICATE_USER', async () => {
    const response = {
      access_token: 'test'
    };
    fetch.mockResponse(JSON.stringify(response));

    await store.dispatch(authenticateUser());
    const actions = store.getActions();

    expect(actions[0].type).toBe(UserAction.AUTHENTICATE_USER);
  });

  it('should call LOGOUT_USER', async () => {
    await store.dispatch(logoutUser());
    const actions = store.getActions();

    expect(actions[0].type).toBe(UserAction.LOGOUT_USER);
  });
});
