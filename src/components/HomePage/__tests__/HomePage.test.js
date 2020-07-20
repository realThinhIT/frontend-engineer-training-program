import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from '..';
import CategoryList from '../../Category/CategoryList';
import ItemList from '../../ItemList';

describe('components/Home test', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<HomePage {...props} />);
  };

  beforeEach(() => {
    props = {
      selectCategory: jest.fn(),
      fetchItems: jest.fn(),
      history: {
        push: jest.fn()
      },
      match: {
        params: {
          categoryId: '1'
        }
      }
    };

    setup();
  });

  it('should render correctly', () => {
    expect(wrapper.find('.page-home').exists()).toBe(true);
    expect(wrapper.find(CategoryList)).toHaveLength(1);
    expect(wrapper.find(ItemList)).toHaveLength(1);
  });
});
