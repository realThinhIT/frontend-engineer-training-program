import React from 'react';
import { shallow } from 'enzyme';

import Navbar from '..';
import UserBadge from '../UserBadge';

describe('components/common/Navbar test', () => {
  let wrapper;

  const setup = () => {
    wrapper = shallow(<Navbar />);
  };

  it('should render correctly', () => {
    setup();

    expect(wrapper.find(UserBadge)).toHaveLength(1);
  });
});
