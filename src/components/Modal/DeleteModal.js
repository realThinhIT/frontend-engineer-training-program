import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  Modal, 
  Alert,
  Button,
  Icon,
  Tag,
  Divider
} from 'antd';
import { withRouter } from 'react-router-dom';

import { selectInteractingItem } from '../../reducers/item';
import { parseErrors } from '../../utils/requestError';
import { hideModal } from '../../actions/modal';
import { fetchItems, deleteItem } from '../../actions/item';

export class DeleteModal extends React.Component {
  /**
   * Trigger when user clicks Confirm to delete.
   */
  onDelete() {
    const { item, currentCategoryId } = this.props;

    this.props.deleteItem(currentCategoryId, item.id).then(res => {
      if (res.success) {
        this.props.hideModal();

        // Only reload if a category is present
        if (currentCategoryId) {
          this.props.fetchItems(currentCategoryId);
          this.props.history.replace(`/categories/${currentCategoryId}`);
        }
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
    const { error, item, isProcessing } = this.props;

    return (
      <Modal
        title="Delete Item"
        style={{ top: 20 }}
        footer={null}
        onCancel={() => this.props.hideModal()}
        visible
      >
        {error && (
          <Alert 
            message="Delete item error."
            type="error" 
            description={this.renderErrors()}
            style={{ marginBottom: 20 }}
          />
        )}

        <div>Are you sure that you want to delete <Tag><b>{item && item.name}</b></Tag>? </div>
        <div>This action cannot be undone.</div>

        <Divider />

        <Button.Group>
          <Button 
            type="danger"
            loading={isProcessing}
            onClick={() => this.onDelete()}
          >
            <Icon type="delete" />
            Delete Anyways
          </Button>

          <Button
            type="default"
            onClick={() => this.props.hideModal()}
          >
            Cancel
          </Button>
        </Button.Group>
      </Modal>
    );
  }
}

DeleteModal.propTypes = {
  isProcessing: PropTypes.bool.isRequired,
  error: PropTypes.any,
  item: PropTypes.object,
  currentCategoryId: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
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
  deleteItem
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(DeleteModal)
);
