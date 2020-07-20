import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  Alert
} from 'antd';

import ItemForm from './ItemForm';
import { selectInteractingItem } from '../../../reducers/item';
import { parseErrors } from '../../../utils/requestError';
import { hideModal } from '../../../actions/modal';
import { addItem, fetchItems, updateItem } from '../../../actions/item';

export class ItemInteractionModal extends React.Component {
  /**
   * After validation passes, the Form submission will trigger this function with the valid values.
   * This function is to trigger API calls and close form if the call is success.
   * It also re-fetch items to update items in the list.
   *
   * @param {*} values
   */
  onSubmit(values) {
    const { item, currentCategoryId } = this.props;

    // In case the user is creating a new item
    if (!item) {
      this.props.addItem(currentCategoryId, values).then(res => {
        if (res.success) {
          this.props.hideModal();

          // Only reload if a category is present
          if (currentCategoryId) {
            this.props.fetchItems(currentCategoryId);
          }
        }
      });
    } else {
      // In case the user is editing an item
      this.props.updateItem(currentCategoryId, item.id, values).then(res => {
        if (res.success) {
          this.props.hideModal();
        }
      });
    }
  }

  /**
   * Render errors as an Alert on top of the Form.
   */
  renderErrors() {
    const { error } = this.props;

    return <div>{parseErrors(error).map(msg => <div key={msg}>{`- ${msg}`}</div>)}</div>;
  }

  render() {
    const { error, item, isProcessing } = this.props;
    const interaction = item ? 'Edit' : 'Add';

    return (
      <Modal
        title={`${interaction} Item`}
        style={{ top: 20 }}
        footer={null}
        onCancel={() => this.props.hideModal()}
        visible
      >
        {error && (
          <Alert
            message={`${interaction} item error.`}
            type="error"
            description={this.renderErrors()}
            style={{ marginBottom: 20 }}
          />
        )}

        <ItemForm
          loading={isProcessing}
          error={error}
          item={item}
          onSubmit={(...args) => this.onSubmit(...args)}
        />
      </Modal>
    );
  }
}

ItemInteractionModal.propTypes = {
  isProcessing: PropTypes.bool.isRequired,
  error: PropTypes.any,
  item: PropTypes.object,
  currentCategoryId: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.item.interactionError,
  isProcessing: state.item.isProcessing,
  item: selectInteractingItem(state.item),
  currentCategoryId: state.category.currentCategoryId
});

const mapDispatchToProps = {
  hideModal,
  fetchItems,
  addItem,
  updateItem
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInteractionModal);
