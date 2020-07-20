import React from 'react';
import PropTypes from 'prop-types';
import { 
  Modal, 
  Alert, 
  Divider, 
  Button 
} from 'antd';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';
import { hideModal, showModal } from '../../../actions/modal';
import { registerUser } from '../../../actions/user';
import { parseErrors } from '../../../utils/requestError';
import { ModalType } from '../../../constants/modals';

export class SignUpModal extends React.PureComponent {
  /**
   * After validation passes, the Form submission will trigger this function with the valid values.
   * This function is to trigger API calls and close form if the call is success.
   * 
   * @param {*} values 
   */
  onSubmit(values) {
    const { confirm, ...userData } = values;

    this.props.registerUser(userData).then(res => {
      if (res.success) {
        const _self = this;

        Modal.success({
          title: 'Registered successfully!',
          content: 'You can now login with your username and password!',
          onOk() {
            /* istanbul ignore next */ 
            _self.openLoginModal();
          }
        });
      }
    });
  }

  /**
   * Hide current modal and open sign in modal.
   */
  openLoginModal() {
    this.props.hideModal();
    this.props.showModal(ModalType.SIGN_IN);
  }

  /**
   * Render errors as an Alert on top of the Form.
   */
  renderErrors() {
    const { error } = this.props;

    return <div>{parseErrors(error).map(msg => <div key={msg}>{`- ${msg}`}</div>)}</div>;
  }

  render() {
    const { isLoading, error } = this.props;

    return (
      <Modal
        title="Sign Up"
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
            message="Registration error. Please correct and try again." 
            type="error" 
            description={this.renderErrors()}
            style={{ marginBottom: 20 }}
          />
        )}

        <SignUpForm 
          onSubmit={(...args) => this.onSubmit(...args)} 
          loading={isLoading}
        />

        <Divider>Already had an account?</Divider>

        <Button
          block
          type="ghost"
          size="large"
          onClick={() => this.openLoginModal()}
        >
          LOGIN
        </Button>
      </Modal>
    );
  }
}

SignUpModal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.user.registerError,
  isLoading: state.user.isRegistering
});

const mapDispatchToProps = {
  showModal,
  hideModal,
  registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);
