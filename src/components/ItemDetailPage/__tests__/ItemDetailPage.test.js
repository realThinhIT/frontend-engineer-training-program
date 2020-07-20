import React from 'react';
import { shallow } from 'enzyme';
import { Card, Button, Skeleton } from 'antd';

import { ItemDetailPage } from '..';

describe('components/ItemDetailPage test', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<ItemDetailPage {...props} />);
  };

  const setupIsOwner = () => {
    props = {
      ...props,
      item: {
        ...props.item
      },
      userId: 1
    };

    setup();
  };

  beforeEach(() => {
    props = {
      loading: false,
      error: null,
      item: {
        id: 1,
        user_id: 1,
        name: 'Item Title',
        description: 'Item Description',
      },

      selectCategory: jest.fn(() => Promise.resolve({ success: true })),
      fetchItem: jest.fn(() => Promise.resolve({ success: true })),
      openEditModal: jest.fn(),
      openDeleteModal: jest.fn(),
      resetState: jest.fn(),
      history: {
        push: jest.fn()
      },
      match: {
        params: {
          categoryId: '1',
          itemId: '1'
        }
      }
    };

    setup();
  });

  it('should render correctly', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(0);
  });

  it('should render loading correctly', () => {
    props = {
      ...props,
      loading: true,
      item: null
    };

    setup();

    expect(wrapper.find(Card).exists()).toBe(false);
    expect(wrapper.find(Skeleton)).toHaveLength(1);
  });

  it('should unmount correctly', () => {
    wrapper.instance().componentWillUnmount();

    expect(wrapper.instance().props.resetState.mock.calls.length).toBe(1);
  });

  it('should render action buttons when I own that item', () => {
    setupIsOwner();

    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('should open modals when I click on action buttons', () => {
    setupIsOwner();

    const buttons = wrapper.find(Button);

    // Edit button
    expect(wrapper.instance().props.openEditModal.mock.calls.length).toBe(0);
    buttons.at(0).simulate('click');
    expect(wrapper.instance().props.openEditModal.mock.calls.length).toBe(1);

    // Delete button
    expect(wrapper.instance().props.openDeleteModal.mock.calls.length).toBe(0);
    buttons.at(1).simulate('click');
    expect(wrapper.instance().props.openDeleteModal.mock.calls.length).toBe(1);
  });
});
