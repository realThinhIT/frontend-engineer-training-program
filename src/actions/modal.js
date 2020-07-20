import { ModalAction } from '../constants/actions';

export const showModal = (modalType, data) => ({
  type: ModalAction.SHOW_MODAL,
  payload: {
    modalType,
    data
  }
});

export const hideModal = () => ({
  type: ModalAction.HIDE_MODAL
});
