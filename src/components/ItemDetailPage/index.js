import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Row,
  Col,
  Skeleton,
  Card,
  Divider,
  Button,
  Icon,
  Timeline,
  Tag
} from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';

import {
  fetchItem,
  openEditModal,
  resetState,
  openDeleteModal
} from '../../actions/item';
import { selectCurrentItem } from '../../reducers/item';
import { withLoadingIndicator } from '../common/Loading';

import './ItemDetailPage.scss';

export class ItemDetailPage extends React.Component {
  componentDidMount() {
    const { match } = this.props;
    const { categoryId, itemId } = match.params;

    // If category and item id is valid, fetch item information
    if (categoryId && itemId) {
      this.props.fetchItem(categoryId, itemId);
    }
  }

  componentWillUnmount() {
    // Reset isLoading and error when user navigates to another page
    this.props.resetState();
  }

  /**
   * Render edit and delete functions in case the user owns that item.
   */
  renderActions() {
    const { item, match, userId } = this.props;
    const { categoryId } = match.params;

    if (item && item.user_id === userId) {
      return (
        <div>
          <Divider />

          <Button.Group>
            <Button
              type="primary"
              onClick={() => this.props.openEditModal(item.id, categoryId)}
            >
              <Icon type="edit" />
              Edit
            </Button>

            <Button
              type="danger"
              onClick={() => this.props.openDeleteModal(item.id)}
            >
              Delete
              <Icon type="delete" />
            </Button>
          </Button.Group>
        </div>
      );
    }

    return null;
  }

  render() {
    const { loading, item } = this.props;

    if (loading || !item) {
      return <Skeleton active />;
    }

    return (
      <div className="item-detail-page">
        <Row>
          <Col span={24}>
            <Card
              title={(
                <>
                  <Button
                    size="default"
                    onClick={() => this.props.history.push(`/categories/${this.props.match.params.categoryId}`)}
                    style={{ marginBottom: 5 }}
                  >
                    <LeftOutlined style={{ fontSize: '13px' }} /> Back
                  </Button><br />

                  <h1>{item.name} <Tag color="magenta" style={{ fontSize: '15px' }}>${item.price}</Tag></h1>
                </>
              )}
            >
              <p style={{ fontSize: 18 }}>{item.description ? item.description : 'No description added'}</p>

              <Divider />

              <Timeline>
                <Timeline.Item><b>Created at:</b> {moment(item.created).format('LLLL')}</Timeline.Item>
                <Timeline.Item><b>Last updated at:</b> {moment(item.updated).format('LLLL')}</Timeline.Item>
              </Timeline>

              <div>
                {this.renderActions()}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

ItemDetailPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  item: PropTypes.object,
  fetchItem: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  userId: PropTypes.number
};

const mapStateToProps = state => ({
  loading: state.item.isLoading,
  error: state.item.error,
  item: selectCurrentItem(state.item),
  userId: state.user.userId
});

const mapDispatchToProps = {
  fetchItem,
  resetState,
  openEditModal,
  openDeleteModal
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withLoadingIndicator(
    withRouter(ItemDetailPage)
  )
);
