import { ModalAction, ItemAction, CategoryAction } from '../constants/actions';
import { ModalType } from '../constants/modals';

export const initialState = {
  isVisible: false,
  modalType: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ModalAction.SHOW_MODAL:
      return {
        ...state,
        isVisible: true,
        modalType: action.payload.modalType
      };

    case ModalAction.HIDE_MODAL:
      return {
        ...state,
        isVisible: false
      };

    case ItemAction.CREATE_ITEM:
    case ItemAction.EDIT_ITEM:
      return {
        ...state,
        isVisible: true,
        modalType: ModalType.ITEM_INTERACTION
      };

    case CategoryAction.CREATE_CATEGORY:
      return {
        ...state,
        isVisible: true,
        modalType: ModalType.CREATE_CATEGORY
      };

    case ItemAction.CONFIRM_DELETE_ITEM:
      return {
        ...state,
        isVisible: true,
        modalType: ModalType.ITEM_DELETE_CONFIRMATION
      };

    default:
      return state;
  }
};
