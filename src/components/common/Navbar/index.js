import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import UserBadge from './UserBadge';

import './Navbar.scss';

export default class Navbar extends React.Component {
  render() {
    return (
      <Layout.Header className="header">
        <UserBadge />

        <div className="logo pointer">
          <a href="/">
            <img
              src="https://www.got-it.ai/assets/images/update-2020/got-it-header-195ea0a585.svg"
              alt="Logo"
            />
          </a>
        </div>
      </Layout.Header>
    );
  }
}
