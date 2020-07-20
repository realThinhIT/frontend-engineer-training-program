import React from 'react';
import { shallow } from 'enzyme';
import { Pagination, Empty, Button } from 'antd';

import { ItemList } from '..';
import ItemCard from '../ItemCard';

describe('components/ItemList test', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<ItemList {...props} />);
  };

  beforeEach(() => {
    props = {
      items: [
        {
          created: '2019-06-16T15:23:42+00:00',
          description: 'Best phone ever.',
          id: 1,
          is_owner: true,
          name: 'Apple iPhone XS Max',
          updated: '2019-06-16T15:23:42+00:00'
        },
        {
          created: '2019-06-16T15:23:42+00:00',
          description: 'This Samsung Galaxy might be the best you can get.',
          id: 2,
          is_owner: false,
          name: 'Samsung Galaxy A50',
          updated: '2019-06-16T15:23:42+00:00'
        },
        {
          created: '2019-06-16T15:23:42+00:00',
          description: 'If you want to switch from other brands, use this.',
          id: 3,
          is_owner: false,
          name: 'OPPO F11 6GB - 64GB',
          updated: '2019-06-16T15:23:42+00:00'
        }
      ],
      page: 1,
      totalItems: 3,
      currentCategory: {
        id: 1,
        name: 'Test'
      },
      fetchItems: jest.fn(),
      openAddModal: jest.fn(),
      userId: null
    };

    setup();
  });

  it('should render correctly', () => {
    expect(wrapper.find(ItemCard)).toHaveLength(3);
    expect(wrapper.find(Pagination)).toHaveLength(1);
    expect(wrapper.find(Button).exists()).toBe(true);

    expect(wrapper.find(Pagination).prop('showTotal')(100, [1, 1])).toBe('1-1 of 100 items');

    wrapper.find(Pagination).prop('onChange')(2, 1);
    expect(wrapper.instance().props.fetchItems.mock.calls.length).toBe(1);

    wrapper.find(Pagination).prop('onShowSizeChange')(2, 10);
    expect(wrapper.instance().props.fetchItems.mock.calls.length).toBe(2);
  });

  it('should render Empty when data is not present', () => {
    props = {
      ...props,
      items: [],
      totalItems: 0,
      page: 1
    };

    setup();

    expect(wrapper.find(Empty)).toHaveLength(1);
  });

  it('should load new data when page changes', () => {
    wrapper.instance().onPageChange(1, 1);

    expect(wrapper.instance().props.fetchItems.mock.calls.length).toBe(1);
  });

  it('should load new data when page size changes', () => {
    wrapper.instance().onShowSizeChange(20, 2);

    expect(wrapper.instance().props.fetchItems.mock.calls.length).toBe(1);
  });

  it('should render create button when logged in', () => {
    props = {
      ...props,
      userId: 1
    };

    setup();

    expect(wrapper.find(Button).exists()).toBe(true);
    expect(wrapper.instance().props.openAddModal.mock.calls.length).toBe(0);
  });

  it('should open create modal when clicked', () => {
    props = {
      ...props,
      userId: 1
    };

    setup();

    expect(wrapper.find(Button).exists()).toBe(true);
    wrapper.find(Button).at(1).simulate('click');
    expect(wrapper.instance().props.openAddModal.mock.calls.length).toBe(1);
  });
});
