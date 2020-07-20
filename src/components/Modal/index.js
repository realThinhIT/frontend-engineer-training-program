import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import ItemInteractionModal from './ItemInteractionModal';
import DeleteModal from './DeleteModal';
import CreateCategoryModal from './CreateCategoryModal';
import { ModalType } from '../../constants/modals';

export class Modal extends React.Component {
  render() {
    const { isVisible, modalType } = this.props;

    if (isVisible) {
      if (modalType === ModalType.SIGN_UP) {
        return <SignUpModal key={ModalType.SIGN_UP} />;
      }

      if (modalType === ModalType.SIGN_IN) {
        return <LoginModal key={ModalType.SIGN_IN} />;
      }

      if (modalType === ModalType.ITEM_INTERACTION) {
        return <ItemInteractionModal key={ModalType.ITEM_INTERACTION} />;
      }

      if (modalType === ModalType.ITEM_DELETE_CONFIRMATION) {
        return <DeleteModal key={ModalType.ITEM_DELETE_CONFIRMATION} />;
      }

      if (modalType === ModalType.CREATE_CATEGORY) {
        return <CreateCategoryModal key={ModalType.CREATE_CATEGORY} />;
      }
    }

    return null;
  }
}

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  modalType: PropTypes.string
};

const mapStateToProps = state => ({
  isVisible: state.modal.isVisible,
  modalType: state.modal.modalType
});

export default connect(mapStateToProps)(Modal);
