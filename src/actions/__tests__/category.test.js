import { fetchCategories } from '../category';
import { CategoryAction } from '../../constants/actions';

describe('actions/category test', () => {
  const { store } = global;

  beforeEach(() => {
    const response = {
      test: 'test'
    };
    fetch.mockResponse(JSON.stringify(response));

    store.clearActions();
  });

  it('should call FETCH_CATEGORIES', async () => {    
    await store.dispatch(fetchCategories());
    const actions = store.getActions();

    expect(actions[0].type).toBe(CategoryAction.FETCH_CATEGORIES);
  });
});
