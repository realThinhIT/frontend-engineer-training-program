import React from 'react';
import { mount } from 'enzyme';
import { Alert } from 'antd';

import { withLoadingIndicator } from '../Loading';

describe('components/common/Loading test', () => {
  let wrapper;
  let props;

  class Container extends React.Component {
    render() { return null; }
  }

  const setup = () => {
    const ContainerWithLoading = withLoadingIndicator(Container);

    wrapper = mount(<ContainerWithLoading />);

    wrapper.setProps(props);
  };

  it('should render correctly when loading', () => {
    props = {
      loading: true,
      error: null
    };

    setup();

    expect(wrapper.find(Alert).exists()).toBe(false);
    expect(wrapper.find({ spinning: true }).exists()).toBe(true);
  });

  it('should render correctly when not loading', () => {
    props = {
      loading: false,
      error: null
    };

    setup();

    expect(wrapper.find(Alert).exists()).toBe(false);
    expect(wrapper.find({ spinning: false }).exists()).toBe(true);
  });

  it('should show error message', () => {
    props = {
      loading: false,
      error: {
        message: 'Test'
      }
    };

    setup();

    expect(wrapper.find(Alert).exists()).toBe(true);
    expect(wrapper.find({ spinning: false }).exists()).toBe(true);
  });
});
