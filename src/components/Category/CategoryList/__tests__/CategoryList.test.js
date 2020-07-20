import React from 'react';
import { shallow, mount } from 'enzyme';
import { Menu, Empty, List, Tooltip } from 'antd';

import { CategoryList } from '..';

describe('components/Category/CategoryList test', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      loading: false,
      categories: [
        {
          created: '2019-06-16T15:23:42+00:00',
          description: 'Phones from international manufacturers and brands.',
          id: 1,
          name: 'Mobile Phones',
          updated: '2019-06-16T15:23:42+00:00'
        },
        {
          created: '2019-06-16T15:23:42+00:00',
          description: 'Best laptops that can enhance your work performance.',
          id: 2,
          name: 'Laptops',
          updated: '2019-06-16T15:23:42+00:00'
        },
        {
          created: '2019-06-16T15:23:42+00:00',
          description: 'Go wherever you want, do whatever you want with these super flexible tablets.',
          id: 3,
          name: 'Tablets',
          updated: '2019-06-16T15:23:42+00:00'
        },
        {
          created: '2019-06-16T15:23:42+00:00',
          description: 'Make your devices prettier!',
          id: 4,
          name: 'Accessories',
          updated: '2019-06-16T15:23:42+00:00'
        }
      ],
      totalItems: 4,
      fetchCategories: jest.fn(() => Promise.resolve({ success: 1 })),
      defaultSelectedCategoryKey: '1',
      history: {
        push: jest.fn()
      },
      match: {
        params: {
          categoryId: 1
        }
      },
      selectCategory: jest.fn(),
      fetchItems: jest.fn(),
      openAddModal: jest.fn(),
      showModal: jest.fn()
    };

    wrapper = shallow(<CategoryList {...props} />);
  });

  const setup = () => {
    wrapper = shallow(<CategoryList {...props} />);
  };

  const setupMount = () => {
    wrapper = mount(<CategoryList {...props} />);
  };

  it('should render correctly when have category', () => {
    expect(wrapper.find(Empty)).toHaveLength(0);
    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find(List)).toHaveLength(1);
  });

  it('should have called the get category action when have not fetched any categories', () => {
    props = {
      ...props,
      categories: []
    };

    setup();

    expect(wrapper.instance().props.fetchCategories.mock.calls.length).toBe(1);
  });

  it('should not have called the get category action when categories are available', () => {
    expect(wrapper.instance().props.fetchCategories.mock.calls.length).toBe(0);
  });

  it('should render 4 different categories', () => {
    expect(wrapper.find(Empty)).toHaveLength(0);
    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(List).props().dataSource).toBe(wrapper.instance().props.categories);
  });

  it('should render empty component when no category is present', () => {
    props = {
      ...props,
      categories: []
    };

    setup();

    expect(wrapper.find(Empty)).toHaveLength(1);
    expect(wrapper.find(Menu.Item).exists()).toBe(false);
  });

  it('should use default key if default selected category key is not defined', () => {
    props = {
      ...props,
      defaultSelectedCategoryKey: undefined
    };

    wrapper = mount(<CategoryList {...props} />);
  });

  it('should render empty if fetch category api call failed', () => {
    props = {
      ...props,
      categories: [],
      fetchCategories: jest.fn(() => Promise.resolve({ success: false })),
    };

    setup();

    expect(wrapper.find(Empty)).toHaveLength(1);
  });
});
