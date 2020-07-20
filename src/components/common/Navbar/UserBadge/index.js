import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Avatar, Dropdown, Menu } from 'antd';

import { logoutUser } from '../../../../actions/user';
import { showModal } from '../../../../actions/modal';
import { fetchItems } from '../../../../actions/item';
import { ModalType } from '../../../../constants/modals';

import './UserBadge.scss';

export class UserBadge extends React.Component {
  onLogoutPress() {
    const { currentCategoryId, page, perPage } = this.props;
    
    this.props.logoutUser();

    // Reload current items to update is_owner
    this.props.fetchItems(
      currentCategoryId,
      page,
      perPage
    );
  }

  render() {
    const { userId, name } = this.props;

    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.onLogoutPress()}>
          Logout
        </Menu.Item>
      </Menu>
    );

    if (userId) {
      return (
        <Dropdown overlay={menu} placement="bottomLeft">
          <div className="user-badge pointer">
            <Avatar className="avatar" size={25} icon="user" /> 
            <b>{name}</b>
          </div>
        </Dropdown>
      );
    }
    
    return (
      <div>
        <div 
          className="user-badge primary pointer" 
          onClick={() => this.props.showModal(ModalType.SIGN_IN)}
        >
          <b>LOGIN</b>
        </div>

        <div 
          className="user-badge pointer" 
          onClick={() => this.props.showModal(ModalType.SIGN_UP)}
        >
          <b>SIGN UP</b>
        </div>
      </div>
    );
  }
}

UserBadge.propTypes = {
  userId: PropTypes.number,
  name: PropTypes.string,
  currentCategoryId: PropTypes.string,
  page: PropTypes.number,
  perPage: PropTypes.number,
  showModal: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userId: state.user.userId,
  name: state.user.name,
  currentCategoryId: state.category.currentCategoryId,
  page: state.item.page,
  perPage: state.item.perPage
});

const mapDispatchToProps = {
  showModal,
  logoutUser,
  fetchItems
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBadge);
