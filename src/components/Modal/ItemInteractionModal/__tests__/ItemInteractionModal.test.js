import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal, Button, Alert, Input } from 'antd';

import { ItemInteractionModal } from '..';
import ItemForm from '../ItemForm';

describe('components/Modal/ItemInteractionModal test', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<ItemInteractionModal {...props} />);
  };

  const setupMount = () => {
    wrapper = mount(<ItemInteractionModal {...props} />);
  };

  beforeEach(() => {
    props = {
      error: null,
      isProcessing: false,
      currentCategoryId: '1',
      item: {
        created: '2019-06-16T15:23:42+00:00',
        description: 'Best phone ever.',
        id: 1,
        price: 10.10,
        name: 'Apple iPhone XS Max',
        updated: '2019-06-16T15:23:42+00:00'
      },
      hideModal: jest.fn(),
      fetchItems: jest.fn(() => Promise.resolve({ success: 1 })),
      addItem: jest.fn(() => Promise.resolve({ success: 1 })),
      updateItem: jest.fn(() => Promise.resolve({ success: 1 })),
    };

    setup();
  });

  it('should render correctly (valid item)', () => {
    expect(wrapper.find(Modal).exists()).toBe(true);
    expect(wrapper.find(Alert).exists()).toBe(false);
    expect(wrapper.find(ItemForm)).toHaveLength(1);
  });

  it('should render correctly (invalid item)', () => {
    props = {
      ...props,
      item: null
    };

    setup();

    expect(wrapper.find(Modal).exists()).toBe(true);
    expect(wrapper.find(Alert).exists()).toBe(false);
    expect(wrapper.find(ItemForm)).toHaveLength(1);
  });

  it('should save when click save button (valid item) and reload category if edit from category page', () => {
    setupMount();

    expect(wrapper.find(Button)).toHaveLength(2);
    wrapper.find('[type="submit"]').simulate('submit');
    expect(wrapper.instance().props.updateItem.mock.calls.length).toBe(1);
  });

  it('should save when click save button (valid item) and not reload category', () => {
    props = {
      ...props,
      currentCategoryId: null
    };
    setupMount();

    expect(wrapper.find(Button)).toHaveLength(2);
    wrapper.find('[type="submit"]').simulate('submit');
    expect(wrapper.instance().props.updateItem.mock.calls.length).toBe(1);
  });

  it('should create when click create button (invalid item)', () => {
    props = {
      ...props,
      item: null
    };

    setupMount();

    expect(wrapper.find(Button)).toHaveLength(2);

    // Check available inputs
    expect(wrapper.find(Input)).toHaveLength(2);
    expect(wrapper.find(Input.TextArea)).toHaveLength(1);
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);

    // Simulate valid typings
    const input = wrapper.find('input');
    const textarea = wrapper.find('textarea');

    input.at(0).simulate('change', { target: { value: 'New Item' } });
    input.at(1).simulate('change', { target: { value: '10.10' } });
    textarea.simulate('change', { target: { value: 'new item for you' } });

    // Submit
    wrapper.find('[type="submit"]').simulate('submit');
    expect(wrapper.instance().props.addItem.mock.calls.length).toBe(1);
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
  });

  it('should close modal when clicked outside', () => {
    setupMount();

    expect(wrapper.find('button.ant-modal-close').exists()).toBe(true);

    wrapper.find('button.ant-modal-close').simulate('click');
  });

  it('should reset form when clicked on reset', () => {
    setupMount();

    expect(wrapper.find('[type="reset"]').exists()).toBe(true);
    wrapper.find('[type="reset"]').simulate('click');
    expect(wrapper.find('input').first().text()).toBe('');
  });
});