import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  Alert
} from 'antd';

import CategoryForm from './CategoryForm';
import { parseErrors } from '../../../utils/requestError';
import { hideModal } from '../../../actions/modal';
import { addCategory, fetchCategories } from '../../../actions/category';

export class CreateCategoryModal extends React.Component {
  /**
   * After validation passes, the Form submission will trigger this function with the valid values.
   * This function is to trigger API calls and close form if the call is success.
   * It also re-fetch items to update items in the list.
   *
   * @param {*} values
   */
  onSubmit(values) {
    const { currentCategoryId } = this.props;

    this.props.addCategory(values).then(res => {
      if (res.success) {
        this.props.hideModal();
        this.props.fetchCategories();
      }
    });
  }

  /**
   * Render errors as an Alert on top of the Form.
   */
  renderErrors() {
    const { error } = this.props;

    return <div>{parseErrors(error).map(msg => <div key={msg}>{`- ${msg}`}</div>)}</div>;
  }

  render() {
    const { error, isProcessing } = this.props;

    return (
      <Modal
        title="Add Category"
        style={{ top: 20 }}
        footer={null}
        onCancel={() => this.props.hideModal()}
        visible
      >
        {error && (
          <Alert
            message="Add category error."
            type="error"
            description={this.renderErrors()}
            style={{ marginBottom: 20 }}
          />
        )}

        <CategoryForm
          loading={isProcessing}
          error={error}
          onSubmit={(...args) => this.onSubmit(...args)}
        />
      </Modal>
    );
  }
}

CreateCategoryModal.propTypes = {
  isProcessing: PropTypes.bool.isRequired,
  error: PropTypes.any,
  currentCategoryId: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.item.interactionError,
  isProcessing: state.item.isProcessing,
  currentCategoryId: state.category.currentCategoryId
});

const mapDispatchToProps = {
  hideModal,
  fetchCategories,
  addCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryModal);
