import reducer, { initialState } from '../user';
import { 
  fetchCurrentUser, 
  registerUser, 
  authenticateUser, 
  logoutUser 
} from '../../actions/user';
import { hideModal } from '../../actions/modal';

describe('actions/user test', () => {
  const { store } = global;

  beforeEach(() => {
    store.clearActions();
  });

  it('should not change state when no corresponding action taken', () => {
    const newState = reducer(undefined, { type: 'SOMETHING_WRONG' });
    expect(newState).toMatchObject(initialState);
  });

  // FETCH_CURRENT_USER
  it('should handle FETCH_CURRENT_USER (success) correctly', async () => { 
    // Success
    fetch.mockResponse(JSON.stringify({
      id: 1,
      username: 'thinhnd',
      name: 'Thinh Nguyen',
      email: 'thinhnd.ict@gmail.com'
    }));

    await store.dispatch(fetchCurrentUser());
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isFetching).toBe(false);
    expect(newState.userId).toBe(1);
    expect(newState.name).toBe('Thinh Nguyen');
  });

  it('should handle FETCH_CURRENT_USER (failure) correctly', async () => {    
    // Success
    fetch.mockResponse(JSON.stringify({
      error_code: 40001,
      message: 'Error'
    }), { status: 400 });

    await store.dispatch(fetchCurrentUser(1));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isFetching).toBe(false);
    expect(newState.userId).toBe(null);
  });

  it('should handle FETCH_CURRENT_USER (failure - fetch exception) correctly', async () => {    
    // Success
    fetch.mockReject(new Error('foo'));

    await store.dispatch(fetchCurrentUser(1));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isFetching).toBe(false);
    expect(newState.userId).toBe(null);
  });

  // REGISTER_USER
  it('should handle REGISTER_USER (success) correctly', async () => { 
    // Success
    fetch.mockResponse(JSON.stringify({
      id: 1,
      username: 'thinhnd',
      name: 'Thinh Nguyen',
      email: 'thinhnd.ict@gmail.com'
    }));

    await store.dispatch(registerUser({}));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isRegistering).toBe(false);
    expect(newState.registerError).toBe(null);
  });

  it('should handle REGISTER_USER (failure) correctly', async () => {    
    // Success
    fetch.mockResponse(JSON.stringify({
      error_code: 40001,
      message: 'Error'
    }), { status: 400 });

    await store.dispatch(registerUser({}));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isRegistering).toBe(false);
    expect(newState.registerError.message).toBe('Error');
  });

  // AUTHENTICATE_USER
  it('should handle AUTHENTICATE_USER (success) correctly', async () => { 
    // Success
    fetch.mockResponse(JSON.stringify({
      access_token: 'TEST_TOKEN'
    }));

    await store.dispatch(authenticateUser({}));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isLoggingIn).toBe(false);
    expect(newState.loginError).toBe(null);
  });

  it('should handle AUTHENTICATE_USER (failure) correctly', async () => {    
    // Success
    fetch.mockResponse(JSON.stringify({
      error_code: 40001,
      message: 'Error'
    }), { status: 400 });

    await store.dispatch(authenticateUser({}));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isLoggingIn).toBe(false);
    expect(newState.loginError.message).toBe('Error');
  });

  // LOGOUT_USER
  it('should handle LOGOUT_USER correctly', async () => { 
    await store.dispatch(logoutUser());
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.name).toBe('');
    expect(newState.userId).toBe(null);
  });

  // HIDE_MODAL
  it('should handle HIDE_MODAL correctly', async () => {    
    // Success
    await store.dispatch(hideModal());
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isRegistering).toBe(false);
    expect(newState.isLoggingIn).toBe(false);
  });
});
