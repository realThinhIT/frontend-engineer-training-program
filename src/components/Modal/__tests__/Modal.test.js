import React from 'react';
import { shallow } from 'enzyme';

import SignUpModal from '../SignUpModal';
import LoginModal from '../LoginModal';
import ItemInteractionModal from '../ItemInteractionModal';
import DeleteModal from '../DeleteModal';
import { Modal as AppModal } from '..';
import { ModalType } from '../../../constants/modals';

describe('components/Modal test', () => {
  let wrapper;
  let props;

  const setup = () => {
    wrapper = shallow(<AppModal {...props} />);
  };

  it('should not render any modal when visible is false', () => {
    props = {
      isVisible: false,
    };

    setup();

    expect(wrapper.find(SignUpModal).exists()).toBe(false);
    expect(wrapper.find(LoginModal).exists()).toBe(false);
  });

  it('should render login modal correctly', () => {
    props = {
      isVisible: true,
      modalType: ModalType.SIGN_IN
    };

    setup();

    expect(wrapper.find(SignUpModal).exists()).toBe(false);
    expect(wrapper.find(LoginModal).exists()).toBe(true);
  });

  it('should render signup modal correctly', () => {
    props = {
      isVisible: true,
      modalType: ModalType.SIGN_UP
    };

    setup();

    expect(wrapper.find(SignUpModal).exists()).toBe(true);
    expect(wrapper.find(LoginModal).exists()).toBe(false);
  });

  it('should render item interaction modal correctly', () => {
    props = {
      isVisible: true,
      modalType: ModalType.ITEM_INTERACTION
    };

    setup();

    expect(wrapper.find(ItemInteractionModal).exists()).toBe(true);
  });

  it('should render delete confirmation modal correctly', () => {
    props = {
      isVisible: true,
      modalType: ModalType.ITEM_DELETE_CONFIRMATION
    };

    setup();

    expect(wrapper.find(DeleteModal).exists()).toBe(true);
  });
});
