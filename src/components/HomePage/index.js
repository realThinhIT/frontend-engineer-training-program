import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';

import CategoryList from '../Category/CategoryList';
import ItemList from '../ItemList';

import './HomePage.scss';

export class HomePage extends React.Component {
  render() {
    const { match } = this.props;

    let categoryXs = 24;
    let categoryMd = 5;
    let itemXs = 24;
    let itemMd = 18;

    if (match.params.categoryId) {
      categoryXs = 0;
      categoryMd = 0;
      itemXs = 24;
      itemMd = 24;
    } else {
      categoryXs = 24;
      categoryMd = 24;
      itemXs = 0;
      itemMd = 0;
    }

    return (
      <div className="page-home">
        <Row>
          <Col span={5} xs={categoryXs} md={categoryMd}>
            <CategoryList
              defaultSelectedCategoryKey={match.params.categoryId}
            />
          </Col>

          <Col span={1} xs={0} md={1} />

          <Col span={18} xs={itemXs} md={itemMd}>
            <ItemList />
          </Col>
        </Row>
      </div>
    );
  }
}

HomePage.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(HomePage);
