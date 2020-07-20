import React from 'react';
import { shallow, mount } from 'enzyme';
import { Menu, Dropdown } from 'antd';

import { UserBadge } from '../UserBadge';

describe('components/common/NavBar/UserBadge test', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<UserBadge {...props} />);
  };

  const setupLoggedIn = () => {
    props = {
      ...props,
      userId: 1,
      name: 'Thinh Nguyen'
    };

    wrapper = mount(<UserBadge {...props} />);
  };

  beforeEach(() => {
    props = {
      userId: null,
      name: '',
      currentCategoryId: '1',
      page: 1,
      perPage: 1,
      showModal: jest.fn(),
      logoutUser: jest.fn(),
      fetchItems: jest.fn()
    };

    setup();
  });

  it('should render correctly when not logged in', () => {
    expect(wrapper.find('.primary')).toHaveLength(1);
    expect(wrapper.find('.user-badge')).toHaveLength(2);
    expect(wrapper.instance().props.showModal.mock.calls.length).toBe(0);
  });

  it('should call modal when click on Login button', () => {
    wrapper.find('.primary').simulate('click');
    expect(wrapper.instance().props.showModal.mock.calls.length).toBe(1);
  });

  it('should call modal when click on Login button', () => {
    wrapper.find('.user-badge').at(1).simulate('click');
    expect(wrapper.instance().props.showModal.mock.calls.length).toBe(1);
  });

  it('should render correctly when logged in', () => {
    setupLoggedIn();

    expect(wrapper.find('.primary')).toHaveLength(0);
    expect(wrapper.find('.user-badge')).toHaveLength(1);
    expect(wrapper.instance().props.showModal.mock.calls.length).toBe(0);
    expect(wrapper.find(Dropdown)).toHaveLength(1);
  });

  it('should call logout action when clicking logout', () => {
    setupLoggedIn();

    wrapper.find(Dropdown).simulate('click');

    const menuInstance = mount(wrapper.find('Dropdown').first().props().overlay);
    menuInstance.find(Menu.Item).simulate('click');

    expect(wrapper.instance().props.logoutUser.mock.calls.length).toBe(1);
  });
});
