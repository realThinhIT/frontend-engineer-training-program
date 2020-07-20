import reducer, { initialState, selectCategories, selectCurrentCategory } from '../category';
import { fetchCategories, selectCategory } from '../../actions/category';
import { openEditModal } from '../../actions/item';

describe('actions/category test', () => {
  const { store } = global;

  beforeEach(() => {
    store.clearActions();
  });

  it('should not change state when no corresponding action taken', () => {
    const newState = reducer(undefined, { type: 'SOMETHING_WRONG' });
    expect(newState).toMatchObject(initialState);
  });

  it('should handle FETCH_CATEGORIES (success) correctly', async () => {
    // Success
    fetch.mockResponse(JSON.stringify({
      total_categories: 1,
      categories: [{
        id: 1,
        name: 'Test 1',
        description: 'Test 2'
      }]
    }));

    await store.dispatch(fetchCategories());
    const actions = store.getActions();

    let newState;
    for (const action of actions) {
      newState = reducer(newState, action);
    }

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.ids).toStrictEqual([1]);
    expect(Object.keys(newState.byId).length).toBe(1);
    expect(selectCategories(newState)).toEqual([{
      id: 1,
      name: 'Test 1',
      description: 'Test 2'
    }]);
  });

  it('should handle FETCH_CATEGORIES (failure) correctly', async () => {
    // Success
    fetch.mockResponse(JSON.stringify({
      error_code: 40001,
      message: 'Error'
    }), { status: 400 });

    await store.dispatch(fetchCategories());
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.isLoading).toBe(false);
    expect(newState.error.message).toBe('Error');
    expect(newState.ids).toStrictEqual([]);
    expect(Object.keys(newState.byId).length).toBe(0);
  });

  it('should handle ItemAction.EDIT_ITEM correctly', async () => {
    // With category id
    await store.dispatch(openEditModal(1, 1));
    let actions = store.getActions();

    let newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.currentCategoryId).toBe(1);

    // Without category id
    await store.dispatch(openEditModal(1));
    actions = store.getActions();

    newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.currentCategoryId).toBe(null);
  });

  it('should handle SELECT_CATEGORY correctly', async () => {
    await store.dispatch(selectCategory(1));
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.currentCategoryId).toBe(1);
    expect(selectCurrentCategory(newState)).toEqual({});
  });
});
