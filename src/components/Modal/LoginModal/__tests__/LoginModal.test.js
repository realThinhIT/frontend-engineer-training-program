import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal, Button, Alert } from 'antd';

import { LoginModal } from '..';
import LoginForm from '../LoginForm';

describe('components/Modal/LoginModal test', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<LoginModal {...props} />);
  };

  const setupMount = () => {
    wrapper = mount(<LoginModal {...props} />);
  };

  beforeEach(() => {
    props = {
      error: null,
      isLoading: false,
      currentCategoryId: '1',
      page: 1,
      perPage: 1,
      showModal: jest.fn(),
      hideModal: jest.fn(),
      authenticateUser: jest.fn(() => Promise.resolve({ success: 1 })),
      fetchCurrentUser: jest.fn(),
      fetchItems: jest.fn()
    };

    setup();
  });

  it('should render correctly', () => {
    expect(wrapper.find(Modal).exists()).toBe(true);
    expect(wrapper.find(Alert).exists()).toBe(false);
  });

  it('should turn to sign up modal when click', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
    wrapper.find(Button).simulate('click');
    expect(wrapper.instance().props.showModal.mock.calls.length).toBe(1);
  });

  it('should render errors', () => {
    props = {
      ...props,
      error: {
        message: 'Test'
      }
    };

    setup();

    expect(wrapper.find(Alert).exists()).toBe(true);
  });

  it('should render correctly when loading', () => {
    props = {
      ...props,
      isLoading: true
    };

    setup();

    expect(wrapper.find(Alert).exists()).toBe(false);
  });

  it('should call api when click login button', () => {
    setupMount();

    expect(wrapper.find(LoginForm)).toHaveLength(1);
    expect(wrapper.find('.log-in-form').exists()).toBe(true);

    // Check available inputs
    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);

    // Simulate valid typings
    const inputs = wrapper.find('input');

    inputs.at(0).simulate('change', { target: { value: 'thinhnd' } });
    inputs.at(1).simulate('change', { target: { value: '12345678' } });

    // Click submit button
    wrapper.find('[type="submit"]').simulate('submit');

    expect(wrapper.instance().props.authenticateUser.mock.calls.length).toBe(1);
  });

  it('should close modal when clicked outside', () => {
    setupMount();

    expect(wrapper.find('button.ant-modal-close').exists()).toBe(true);

    wrapper.find('button.ant-modal-close').simulate('click');
  });
});
