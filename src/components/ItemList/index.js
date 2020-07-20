import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Empty, Pagination, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import config from '../../config';
import ItemCard from './ItemCard';
import { selectItems } from '../../reducers/item';
import { withLoadingIndicator } from '../common/Loading';
import { selectCurrentCategory } from '../../reducers/category';
import { fetchItems, openAddModal } from '../../actions/item';
import { ModalType } from '../../constants/modals';
import { showModal } from '../../actions/modal';

export class ItemList extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      size: config.PAGINATION_ITEMS_PER_PAGE,
      currentPage: 1
    };
  }

  /**
   * Reload items when user changes their page number in pagination.
   *
   * @param {*} nextPage
   * @param {*} pageSize
   */
  onPageChange(nextPage, pageSize) {
    this.setState({
      currentPage: nextPage,
      size: pageSize
    }, () => {
      this.loadItems();
    });
  }

  /**
   * Reload items when user changes their number of items per page in pagination.
   *
   * @param {*} current
   * @param {*} size
   */
  onShowSizeChange(current, size) {
    if (current !== size) {
      this.setState({
        currentPage: 1,
        size
      }, () => {
        this.loadItems();
      });
    }
  }

  /**
   * Fetch items with corresponding page and size from component's state.
   */
  loadItems() {
    const { currentCategory } = this.props;
    const { currentPage, size } = this.state;

    this.props.fetchItems(currentCategory.id, currentPage, size);
  }

  /**
   * Render a list of items as ItemCards.
   */
  renderItems() {
    const { items } = this.props;

    if (!items || (items && items.length === 0)) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
      );
    }

    return (
      <div>
        {items.map(item => (
          <ItemCard
            item={item}
            key={`item-${item.id}`}
          />
        ))}
      </div>
    );
  }

  render() {
    const {
      currentCategory,
      totalItems,
      page,
      userId
    } = this.props;

    return (
      <div className="item-list">
        <h2>
          <Button size="default" onClick={() => this.props.history.push('/')} style={{ marginBottom: 5 }}>
            <LeftOutlined style={{ fontSize: '13px' }} /> Back
          </Button><br />

          {currentCategory.name}

          <Button
            type="primary"
            shape="round"
            icon="plus"
            style={{ float: 'right' }}
            onClick={() => {
              if (userId) {
                this.props.openAddModal();
              } else {
                this.props.showModal(ModalType.SIGN_IN);
              }
            }}
          >
            {!userId ? 'Login to add item' : 'Add item'}
          </Button>
        </h2>

        {this.renderItems()}

        <Pagination
          showSizeChanger
          pageSizeOptions={['2', '5', '10', '20', '30', '40', '50', '100']}
          defaultPageSize={this.state.size}
          current={this.state.currentPage}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          defaultCurrent={page}
          total={totalItems}
          onChange={(newPage, pageSize) => this.onPageChange(newPage, pageSize)}
          onShowSizeChange={(current, size) => this.onShowSizeChange(current, size)}
        />
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.array,
  page: PropTypes.number,
  currentCategory: PropTypes.object,
  totalItems: PropTypes.number,
  userId: PropTypes.number,
  fetchItems: PropTypes.func.isRequired,
  openAddModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.item.isLoading,
  error: state.item.error,
  items: selectItems(state.item),
  currentCategory: selectCurrentCategory(state.category),
  page: state.item.page,
  totalItems: state.item.totalItems,
  userId: state.user.userId
});

const mapDispatchToProps = {
  fetchItems,
  openAddModal,
  showModal
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withLoadingIndicator(withRouter(ItemList))
);
