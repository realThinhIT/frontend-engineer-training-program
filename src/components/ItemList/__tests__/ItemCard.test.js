import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { Card, Icon } from 'antd';

import { ItemCard } from '../ItemCard';

describe('components/ItemList/ItemCard test', () => {
  let wrapper;
  let props;

  const setupMount = () => {
    wrapper = mount(<Router><ItemCard {...props} /></Router>);
  };

  const setup = () => {
    wrapper = shallow(<ItemCard {...props} />);
  };

  beforeEach(() => {
    props = {
      item: {
        created: '2019-06-16T15:23:42+00:00', 
        description: 'Best phone ever.', 
        id: 1, 
        is_owner: true, 
        name: 'Apple iPhone XS Max', 
        updated: '2019-06-16T15:23:42+00:00'
      },
      currentCategory: {
        id: 1
      },
      openEditModal: jest.fn(),
      openDeleteModal: jest.fn()
    };

    setup();
  });

  it('should render correctly (without is_owner)', () => {
    props = {
      ...props,
      item: {
        ...props.item,
        is_owner: undefined
      }
    };

    setup();

    expect(wrapper.find(Card)).toHaveLength(1);
    expect(wrapper.find({ actions: [] })).toHaveLength(1);
    expect(wrapper.find(Icon)).toHaveLength(0);
  });

  it('should render correctly (with is_owner = true)', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it('should render action buttons correctly (with is_owner = true)', () => {
    setupMount();

    expect(wrapper.find(Card)).toHaveLength(1);
  
    const actionsWrapper = wrapper.find(Card).first().props().actions;
    expect(actionsWrapper.length).toBe(2);

    // edit
    const editShallow = shallow(actionsWrapper[0]);
    editShallow.find('div').simulate('click');
    expect(wrapper.instance().props.children.props.openEditModal.mock.calls.length).toBe(1);
    editShallow.find('div').simulate('click');
    expect(wrapper.instance().props.children.props.openEditModal.mock.calls.length).toBe(2);

    // delete
    const deleteShallow = shallow(actionsWrapper[1]);
    deleteShallow.find('div').simulate('click');
    expect(wrapper.instance().props.children.props.openDeleteModal.mock.calls.length).toBe(1);
  });
});
