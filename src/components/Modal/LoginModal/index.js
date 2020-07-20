import React from 'react';
import PropTypes from 'prop-types';
import { 
  Modal, 
  Alert, 
  Divider, 
  Button 
} from 'antd';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import { hideModal, showModal } from '../../../actions/modal';
import { authenticateUser, fetchCurrentUser } from '../../../actions/user';
import { ModalType } from '../../../constants/modals';
import { fetchItems } from '../../../actions/item';

export class LoginModal extends React.PureComponent {
  /**
 * After validation passes, the Form submission will trigger this function with the valid values.
 * This function is to trigger API calls and close form if the call is success.
 * It also update access token to localStorage as well as re-fetch items.
 * 
 * @param {*} values 
 */
  onSubmit(values) {
    const { confirm, ...userData } = values;
    const { currentCategoryId, page, perPage } = this.props;

    this.props.authenticateUser(userData).then(res => {
      if (res.success) {
        // Fetch current user information and hide login modal
        this.props.fetchCurrentUser();
        this.props.hideModal();

        // Reload current items
        this.props.fetchItems(
          currentCategoryId,
          page,
          perPage
        );
      }
    });
  }

  /**
   * Hide current modal and open sign up modal.
   */
  openSignUpModal() {
    this.props.hideModal();
    this.props.showModal(ModalType.SIGN_UP);
  }

  /**
   * Render errors as an Alert on top of the Form.
   */
  renderErrors() {
    const { error } = this.props;

    return (
      <div>
        {error.message}
      </div>
    );
  }

  render() {
    const { isLoading, error } = this.props;

    return (
      <Modal
        title="Log In"
        style={{ top: 20 }}
        footer={null}
        onCancel={() => this.props.hideModal()}
        visible
      >
        <div style={{ marginBottom: 20 }}>
          Please fill in the following information.
        </div>

        {error && (
          <Alert 
            message="Invalid Credentials." 
            type="error" 
            description={this.renderErrors()}
            style={{ marginBottom: 20 }}
          />
        )}

        <LoginForm 
          onSubmit={(...args) => this.onSubmit(...args)} 
          loading={isLoading}
        />

        <Divider>Don&apos;t have an account?</Divider>

        <Button
          block
          type="ghost"
          size="large"
          onClick={() => this.openSignUpModal()}
        >
          SIGN UP
        </Button>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  currentCategoryId: PropTypes.string,
  page: PropTypes.number,
  perPage: PropTypes.number,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  authenticateUser: PropTypes.func.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.user.loginError,
  isLoading: state.user.isLoggingIn,
  currentCategoryId: state.category.currentCategoryId,
  page: state.item.page,
  perPage: state.item.perPage
});

const mapDispatchToProps = {
  showModal,
  hideModal,
  authenticateUser,
  fetchCurrentUser,
  fetchItems
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
