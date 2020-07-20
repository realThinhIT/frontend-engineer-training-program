import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import ItemDetailPage from '../ItemDetailPage';
import Navbar from '../common/Navbar';
import HomePage from '../HomePage';
import Modal from '../Modal';
import { fetchCurrentUser } from '../../actions/user';
import { withLoadingIndicator } from '../common/Loading';

import './App.scss';

export class App extends React.Component {
  componentDidMount() {
    // Dispatch action get current user in case accessToken is available
    if (localStorage.getItem('accessToken')) {
      this.props.fetchCurrentUser();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Layout className="layout">
            <Navbar />
            <Modal />

            <Layout.Content className="contentWrapper">
              <div className="content">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/categories/:categoryId" component={HomePage} />
                  <Route exact path="/categories/:categoryId/items/:itemId" component={ItemDetailPage} />
                </Switch>
              </div>
            </Layout.Content>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.user.isFetching
});

const mapDispatchToProps = {
  fetchCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withLoadingIndicator(App)
);
