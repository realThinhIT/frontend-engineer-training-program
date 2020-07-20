import React from 'react';
import PropTypes from 'prop-types';
import {
  Empty, Button, List, Pagination, Tooltip
} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import config from '../../../config';
import { fetchCategories, selectCategory, openAddModal } from '../../../actions/category';
import { showModal } from '../../../actions/modal';
import { selectCategories } from '../../../reducers/category';
import { withLoadingIndicator } from '../../common/Loading';
import { fetchItems } from '../../../actions/item';
import { ModalType } from '../../../constants/modals';

import './CategoryList.scss';

export class CategoryList extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      size: config.PAGINATION_ITEMS_PER_PAGE,
      currentPage: 1
    };
  }

  componentDidMount() {
    const { categories, defaultSelectedCategoryKey } = this.props;

    // When mounted, if there are no categories available then fetch from API
    if (
      !categories
        || (categories && categories.length === 0)
    ) {
      this.props.fetchCategories().then(v => {
        if (defaultSelectedCategoryKey) {
          this.onCategoryChange(defaultSelectedCategoryKey);
        }
      });
    }
  }

  /**
   * Reload categories when user changes their page number in pagination.
   *
   * @param {*} nextPage
   * @param {*} pageSize
   */
  onPageChange(nextPage, pageSize) {
    this.setState({
      currentPage: nextPage,
      size: pageSize
    }, () => {
      this.loadCategories();
    });
  }

  /**
   * Reload categories when user changes their number of items per page in pagination.
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
        this.loadCategories();
      });
    }
  }

  /**
   * Callback function when category is changed.
   *
   * @param {*} categoryId
   */
  onCategoryChange(categoryId) {
    this.props.history.push(`/categories/${categoryId}`);

    this.props.selectCategory(categoryId);
    this.props.fetchItems(categoryId);
  }

  /**
   * Fetch categories with corresponding page and size from component's state.
   */
  loadCategories() {
    const { currentPage, size } = this.state;

    this.props.fetchCategories(currentPage, size);
  }

  /**
   * Render categories list as a menu.
   */
  renderCategories() {
    const { categories } = this.props;

    // If there's no category, render an Empty component
    if (!categories || (categories && categories.length === 0)) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: 20, marginBottom: 20 }}
        />
      );
    }

    return (
      <List
        size="large"
        bordered
        dataSource={categories}
        renderItem={category => (
          <Tooltip placement="topLeft" title={category.description ? category.description : 'No description'}>
            <List.Item className="pointer" onClick={() => this.onCategoryChange(category.id)}>
              <div>
                <b>{category.name}</b>
              </div>
            </List.Item>
          </Tooltip>
        )}
      />
    );
  }

  render() {
    const { userId, page, totalItems } = this.props;

    return (
      <div className="category-list">
        <h2>
          Categories

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
            {!userId ? 'Login to add category' : 'Add category'}
          </Button>
        </h2>

        {this.renderCategories()}

        <Pagination
          style={{ marginTop: 20 }}
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

CategoryList.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  categories: PropTypes.array,
  defaultSelectedCategoryKey: PropTypes.string,
  fetchCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  userId: PropTypes.number,
  openAddModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.category.isLoading,
  error: state.category.error,
  categories: selectCategories(state.category),
  userId: state.user.userId,
  page: state.category.page,
  totalItems: state.category.totalItems,
});

const mapDispatchToProps = {
  fetchCategories,
  selectCategory,
  fetchItems,
  openAddModal,
  showModal
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withLoadingIndicator(
    withRouter(CategoryList)
  )
);
