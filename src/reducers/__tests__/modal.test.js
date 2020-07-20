import { showModal, hideModal } from '../../actions/modal';
import { ModalType } from '../../constants/modals';
import reducer, { initialState } from '../modal';
import { openAddModal, openEditModal, openDeleteModal } from '../../actions/item';

describe('actions/modal test', () => {
  const { store } = global;

  beforeEach(() => {
    store.clearActions();
  });

  it('should not change state when no corresponding action taken', () => {
    const newState = reducer(undefined, { type: 'SOMETHING_WRONG' });
    expect(newState).toMatchObject(initialState);
  });

  it('should handle SHOW_MODAL with SIGN_IN correctly', async () => {    
    await store.dispatch(showModal(ModalType.SIGN_IN));
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.modalType).toBe(ModalType.SIGN_IN);
    expect(newState.isVisible).toBe(true);
  });

  it('should handle HIDE_MODAL correctly', async () => {    
    await store.dispatch(hideModal());
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);
    
    expect(newState.isVisible).toBe(false);
  });

  it('should handle ITEM_INTERACTION correctly', async () => {    
    // Add modal
    await store.dispatch(openAddModal());
    let actions = store.getActions();
    let newState = reducer(undefined, actions[actions.length - 1]);
    expect(newState.modalType).toBe(ModalType.ITEM_INTERACTION);
    expect(newState.isVisible).toBe(true);

    // Edit modal
    await store.dispatch(openEditModal());
    actions = store.getActions();
    newState = reducer(undefined, actions[actions.length - 1]);
    expect(newState.modalType).toBe(ModalType.ITEM_INTERACTION);
    expect(newState.isVisible).toBe(true);
  });

  it('should handle CONFIRM_DELETE_ITEM correctly', async () => {    
    // Add modal
    await store.dispatch(openDeleteModal());
    const actions = store.getActions();

    const newState = reducer(undefined, actions[actions.length - 1]);

    expect(newState.modalType).toBe(ModalType.ITEM_DELETE_CONFIRMATION);
    expect(newState.isVisible).toBe(true);
  });
});
