import React from 'react';
import { shallow } from 'enzyme';

import { App } from '..';

describe('components/App test', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<App {...props} />);
  };

  beforeEach(() => {
    props = {
      loading: false,
      fetchCurrentUser: jest.fn()
    };

    setup();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render app correctly', () => {
    expect(wrapper.find('.app').exists()).toBe(true);
    expect(wrapper.find('.app .content').exists()).toBe(true);
  });

  it('should not fetch current user when start app without saved access token', () => {
    expect(wrapper.instance().props.fetchCurrentUser.mock.calls.length).toBe(0);
  });

  it('should fetch current user when start app with saved access token', () => {
    localStorage.setItem('accessToken', 'test');

    setup();

    expect(wrapper.instance().props.fetchCurrentUser.mock.calls.length).toBe(1);
  });
});
