import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon, Alert } from 'antd';

/**
 * HOC to make component has loading feature.
 * Requires props to have:
 *  - loading: boolean
 *  - error: RequestError or Exception
 * 
 * @param {*} WrappedComponent 
 */
export const withLoadingIndicator = WrappedComponent => {
  class LoadingHOC extends React.Component {
    /**
     * To render error messages from `error` as an Alert on top of the component.
     */
    renderErrorMessage() {
      const { error } = this.props;

      if (error && error.message) {
        return (
          <Alert
            message="Error"
            description={error.message}
            type="error"
            showIcon
            style={{ marginBottom: 20 }}
          />
        );
      }

      return null;
    }

    render() {
      const { loading } = this.props;
      
      return (
        <Spin 
          spinning={loading} 
          indicator={
            <Icon type="loading" style={{ fontSize: 40 }} spin />
          }
        >
          {this.renderErrorMessage()}

          <WrappedComponent {...this.props} />
        </Spin>
      );
    }
  }

  LoadingHOC.propTypes = {
    error: PropTypes.any,
    loading: PropTypes.bool
  };

  return LoadingHOC;
};
