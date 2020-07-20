import { fetchItem, fetchItems, addItem, updateItem, deleteItem } from '../item';
import { ItemAction } from '../../constants/actions';

describe('actions/item test', () => {
  const { store } = global;

  beforeEach(() => {
    const response = {
      test: 'test'
    };
    fetch.mockResponse(JSON.stringify(response));

    store.clearActions();
  });

  it('should call FETCH_ITEM', async () => {    
    await store.dispatch(fetchItem(1, 1));
    const actions = store.getActions();

    expect(actions[0].type).toBe(ItemAction.FETCH_ITEM);
  });

  it('should call FETCH_ITEMS', async () => {    
    await store.dispatch(fetchItems(1, 1, 20));
    const actions = store.getActions();

    expect(actions[0].type).toBe(ItemAction.FETCH_ITEMS);
  });

  it('should call ADD_ITEM', async () => {    
    await store.dispatch(addItem(1, {}));
    const actions = store.getActions();

    expect(actions[0].type).toBe(ItemAction.ADD_ITEM);
  });

  it('should call UPDATE_ITEM', async () => {    
    await store.dispatch(updateItem(1, 1, {}));
    const actions = store.getActions();

    expect(actions[0].type).toBe(ItemAction.UPDATE_ITEM);
  });

  it('should call DELETE_ITEM', async () => {    
    await store.dispatch(deleteItem(1, 1));
    const actions = store.getActions();

    expect(actions[0].type).toBe(ItemAction.DELETE_ITEM);
  });
});
