import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button, Alert } from 'antd';

import { DeleteModal } from '../DeleteModal';

describe('components/Modal/DeleteItem test', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<DeleteModal {...props} />);
  };

  const setupMount = () => {
    wrapper = mount(<DeleteModal {...props} />);
  };

  beforeEach(() => {
    props = {
      error: null,
      isProcessing: false,
      item: {
        id: 1,
        name: 'Hi'
      },
      currentCategoryId: '1',
      hideModal: jest.fn(),
      fetchItems: jest.fn(() => Promise.resolve({ success: 1 })),
      deleteItem: jest.fn(() => Promise.resolve({ success: 1 })),
      history: {
        replace: jest.fn()
      }
    };

    setup();
  });

  it('should render correctly', () => {
    expect(wrapper.find(Button)).toHaveLength(2);
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
      isProcessing: true
    };

    setup();

    expect(wrapper.find(Alert).exists()).toBe(false);
    expect(wrapper.find({ loading: true }).exists()).toBe(true);
  });

  it('should call api when click delete', () => {
    wrapper.find(Button).at(0).simulate('click');
    expect(wrapper.instance().props.deleteItem.mock.calls.length).toBe(1);
  });

  it('should close modal when clicked cancel', () => {
    setupMount();

    wrapper.find(Button).at(1).simulate('click');
    expect(wrapper.instance().props.hideModal.mock.calls.length).toBe(1);
  });

  it('should close modal when clicked outside', () => {
    setupMount();

    expect(wrapper.find('button.ant-modal-close').exists()).toBe(true);

    wrapper.find('button.ant-modal-close').simulate('click');
  });
});
