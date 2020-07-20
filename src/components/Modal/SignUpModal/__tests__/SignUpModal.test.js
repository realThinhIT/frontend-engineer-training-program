import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal, Button, Alert } from 'antd';

import { SignUpModal } from '..';
import SignUpForm from '../SignUpForm';

describe('components/Modal/LoginModal test', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<SignUpModal {...props} />);
  };

  const setupMount = () => {
    wrapper = mount(<SignUpModal {...props} />);
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
      registerUser: jest.fn(() => Promise.resolve({ success: true })),
      fetchCurrentUser: jest.fn(),
      fetchItems: jest.fn()
    };

    setup();
  });

  it('should render correctly', () => {
    expect(wrapper.find(Modal).exists()).toBe(true);
    expect(wrapper.find(Alert).exists()).toBe(false);
  });

  it('should turn to login modal when click', () => {
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

  it('should call api when click sign up button', () => {
    setupMount();

    expect(wrapper.find(SignUpForm)).toHaveLength(1);
    expect(wrapper.find('.sign-up-form').exists()).toBe(true);

    // Check available inputs
    expect(wrapper.find('input')).toHaveLength(5);
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);

    // Simulate valid typings
    const inputs = wrapper.find('input');

    inputs.at(0).simulate('change', { target: { value: 'thinhnd.ict@gmail.com' } });
    inputs.at(1).simulate('change', { target: { value: 'thinhnd' } });
    inputs.at(2).simulate('change', { target: { value: '12345678a' } });
    inputs.at(3).simulate('change', { target: { value: '1234567' } });
    inputs.at(3).simulate('change', { target: { value: '12345678a' } });
    inputs.at(4).simulate('change', { target: { value: 'Thinh Nguyen' } });

    // Click submit button
    wrapper.find('[type="submit"]').simulate('submit');

    expect(wrapper.instance().props.registerUser.mock.calls.length).toBe(1);
  });

  it('should close modal when clicked outside', () => {
    setupMount();

    expect(wrapper.find('button.ant-modal-close').exists()).toBe(true);

    wrapper.find('button.ant-modal-close').simulate('click');
  });
});
