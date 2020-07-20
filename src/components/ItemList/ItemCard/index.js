import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { selectCurrentCategory } from '../../../reducers/category';
import { openEditModal, openDeleteModal } from '../../../actions/item';

import './ItemCard.scss';

export class ItemCard extends React.Component {
  render() {
    const { item, currentCategory, userId } = this.props;

    const actions = item.user_id === userId
      ? [
        <div onClick={() => this.props.openEditModal(item.id)}>
          <Icon type="edit" />
          {' Edit'}
        </div>,
        <div className="delete-action" onClick={() => this.props.openDeleteModal(item.id)}>
          <Icon type="delete" />
          {' Delete'}
        </div>
      ]
      : [];

    return (
      <Card
        hoverable
        actions={actions}
        style={{ marginBottom: 20 }}
        className="item-card"
      >
        <Link to={`/categories/${currentCategory.id}/items/${item.id}`}>
          {item.user_id === userId ? <Tag color="purple" style={{ float: 'right' }}>My Item</Tag> : null}

          <Card.Meta
            title={(
              <>
                {item.name}
                <Tag color="magenta" style={{ fontSize: '15px', marginLeft: 10 }}>${item.price}</Tag>
              </>
            )}
            description={item.description ? item.description : 'No description added'}
          />
        </Link>
      </Card>
    );
  }
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  currentCategory: PropTypes.object,
  openEditModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  userId: PropTypes.number
};

const mapStateToProps = state => ({
  currentCategory: selectCurrentCategory(state.category),
  userId: state.user.userId
});

const mapDispatchToProps = {
  openEditModal,
  openDeleteModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
