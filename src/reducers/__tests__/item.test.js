import reducer, { initialState, selectItems, selectCurrentItem } from '../item';
import { 
  fetchItems, 
  openEditModal, 
  openAddModal, 
  openDeleteModal, 
  fetchItem, 
  addItem, 
  updateItem, 
  deleteItem, 
  resetState 
} from '../../actions/item';
import { hideModal } from '../../actions/modal';

describe('actions/item test', () => {
  const { store } = global;

  beforeEach(() => {
    store.clearActions();
  });

  it('should not change state when no corresponding action taken', () => {
    const newState = reducer(undefined, { type: 'SOMETHING_WRONG' });
    expect(newState).toMatchObject(initialState);
  });

  it('should handle FETCH_ITEMS (success) correctly', async () => { 
    // Success
    fetch.mockResponse(JSON.stringify({
      items: [{
        id: 1,
        name: 'Test 1',
        description: 'Test 2'
      }]
    }));

    await store.dispatch(fetchItems(1));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.ids).toStrictEqual([1]);
    expect(Object.keys(newState.byId).length).toBe(1);
    expect(selectItems(newState)).toStrictEqual([{
      id: 1,
      name: 'Test 1',
      description: 'Test 2'
    }]);
  });

  it('should handle FETCH_ITEMS (failure) correctly', async () => {    
    // Success
    fetch.mockResponse(JSON.stringify({
      error_code: 40001,
      message: 'Error'
    }), { status: 400 });

    await store.dispatch(fetchItems(1));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isLoading).toBe(false);
    expect(newState.error.message).toBe('Error');
    expect(newState.ids).toStrictEqual([]);
    expect(Object.keys(newState.byId).length).toBe(0);
  });

  it('should handle FETCH_ITEM (success) correctly', async () => { 
    // Success
    fetch.mockResponse(JSON.stringify({
      id: 1,
      name: 'Test 1',
      description: 'Test 2'
    }));

    await store.dispatch(fetchItem(1, 1));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.ids).toStrictEqual([]);
    expect(Object.keys(newState.byId).length).toBe(1);
    expect(newState.currentItemId).toBe(1);
  });

  it('should handle FETCH_ITEM (failure) correctly', async () => {    
    // Success
    fetch.mockResponse(JSON.stringify({
      error_code: 40001,
      message: 'Error'
    }), { status: 400 });

    await store.dispatch(fetchItem(1, 1));
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.isLoading).toBe(false);
    expect(newState.error.message).toBe('Error');
    expect(newState.ids).toStrictEqual([]);
    expect(Object.keys(newState.byId).length).toBe(0);
  });

  it('should handle ADD_ITEM (success) correctly', async () => { 
    // Success
    fetch.mockResponse(JSON.stringify({
      id: 1,
      name: 'Test 1',
      description: 'Test 2'
    }));

    await store.dispatch(addItem({}));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isProcessing).toBe(false);
    expect(newState.interactionError).toBe(null);
  });

  it('should handle ADD_ITEM (failure) correctly', async () => {    
    // Success
    fetch.mockResponse(JSON.stringify({
      error_code: 40001,
      message: 'Error'
    }), { status: 400 });

    await store.dispatch(addItem(1, 1));
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.isProcessing).toBe(false);
    expect(newState.interactionError.message).toBe('Error');
  });

  it('should handle UPDATE_ITEM (success) correctly', async () => { 
    // Success
    fetch.mockResponse(JSON.stringify({
      id: 1,
      name: 'Test 1',
      description: 'Test 2'
    }));

    await store.dispatch(updateItem({}));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isProcessing).toBe(false);
    expect(newState.interactionError).toBe(null);
  });

  it('should handle UPDATE_ITEM (failure) correctly', async () => {    
    // Success
    fetch.mockResponse(JSON.stringify({
      error_code: 40001,
      message: 'Error'
    }), { status: 400 });

    await store.dispatch(updateItem(1, 1));
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.isProcessing).toBe(false);
    expect(newState.interactionError.message).toBe('Error');
  });

  it('should handle DELETE_ITEM (success) correctly', async () => { 
    // Success
    fetch.mockResponse(JSON.stringify({
      id: 1,
      name: 'Test 1',
      description: 'Test 2'
    }));

    await store.dispatch(deleteItem({}));
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isProcessing).toBe(false);
    expect(newState.interactionError).toBe(null);
  });

  it('should handle DELETE_ITEM (failure) correctly', async () => {    
    // Success
    fetch.mockResponse(JSON.stringify({
      error_code: 40001,
      message: 'Error'
    }), { status: 400 });

    await store.dispatch(deleteItem(1, 1));
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.isProcessing).toBe(false);
    expect(newState.interactionError.message).toBe('Error');
  });

  it('should handle EDIT_ITEM correctly', async () => {    
    // With category id
    await store.dispatch(openEditModal(1, 1));
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.interactingItemId).toBe(1);
  });

  it('should handle ADD_ITEM correctly', async () => {    
    // With category id
    await store.dispatch(openAddModal());
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.interactingItemId).toBe(null);
  });

  it('should handle ITEM_DELETE_CONFIRMATION correctly', async () => {    
    // With category id
    await store.dispatch(openDeleteModal(1, 1));
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.interactingItemId).toBe(1);
  });

  it('should handle ModalAction.HIDE_MODAL correctly', () => {
    store.dispatch(hideModal());
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.interactingItemId).toBe(null);
  });

  it('should handle RESET_STATE correctly', async () => {    
    // With category id
    await store.dispatch(resetState());
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.error).toBe(null);
  });

  it('should handle selectCurrentItem correctly', () => {
    expect(selectCurrentItem({
      currentItemId: 1,
      byId: { 1: { } }
    })).toStrictEqual({});

    expect(selectCurrentItem({
      currentItemId: null,
      byId: { 1: { } }
    })).toStrictEqual(null);
  });
});
