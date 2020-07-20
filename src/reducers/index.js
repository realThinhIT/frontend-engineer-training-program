import { combineReducers } from 'redux';
import category from './category';
import item from './item';
import user from './user';
import modal from './modal';

export default combineReducers({
  category,
  item,
  user,
  modal
});
