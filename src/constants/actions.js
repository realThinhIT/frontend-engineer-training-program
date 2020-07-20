export const CategoryAction = {
  FETCH_CATEGORIES: 'FETCH_CATEGORIES',
  FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE: 'FETCH_CATEGORIES_FAILURE',

  ADD_CATEGORY: 'ADD_CATEGORY',
  ADD_CATEGORY_SUCCESS: 'ADD_CATEGORY_SUCCESS',
  ADD_CATEGORY_FAILURE: 'ADD_CATEGORY_FAILURE',

  SELECT_CATEGORY: 'SELECT_CATEGORY',
  CREATE_CATEGORY: 'CREATE_CATEGORY'
};

export const ItemAction = {
  FETCH_ITEM: 'FETCH_ITEM',
  FETCH_ITEM_SUCCESS: 'FETCH_ITEM_SUCCESS',
  FETCH_ITEM_FAILURE: 'FETCH_ITEM_FAILURE',

  FETCH_ITEMS: 'FETCH_ITEMS',
  FETCH_ITEMS_SUCCESS: 'FETCH_ITEMS_SUCCESS',
  FETCH_ITEMS_FAILURE: 'FETCH_ITEMS_FAILURE',

  ADD_ITEM: 'ADD_ITEM',
  ADD_ITEM_SUCCESS: 'ADD_ITEM_SUCCESS',
  ADD_ITEM_FAILURE: 'ADD_ITEM_FAILURE',

  UPDATE_ITEM: 'UPDATE_ITEM',
  UPDATE_ITEM_SUCCESS: 'UPDATE_ITEM_SUCCESS',
  UPDATE_ITEM_FAILURE: 'UPDATE_ITEM_FAILURE',

  DELETE_ITEM: 'DELETE_ITEM',
  DELETE_ITEM_SUCCESS: 'DELETE_ITEM_SUCCESS',
  DELETE_ITEM_FAILURE: 'DELETE_ITEM_FAILURE',

  CREATE_ITEM: 'CREATE_ITEM',
  EDIT_ITEM: 'EDIT_ITEM',
  CONFIRM_DELETE_ITEM: 'CONFIRM_DELETE_ITEM',
  RESET_STATE: 'RESET_STATE'
};

export const UserAction = {
  AUTHENTICATE_USER: 'AUTHENTICATE_USER',
  AUTHENTICATE_USER_SUCCESS: 'AUTHENTICATE_USER_SUCCESS',
  AUTHENTICATE_USER_FAILURE: 'AUTHENTICATE_USER_FAILURE',

  REGISTER_USER: 'REGISTER_USER',
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAILURE: 'REGISTER_USER_FAILURE',

  FETCH_CURRENT_USER: 'FETCH_CURRENT_USER',
  FETCH_CURRENT_USER_SUCCESS: 'FETCH_CURRENT_USER_SUCCESS',
  FETCH_CURRENT_USER_FAILURE: 'FETCH_CURRENT_USER_FAILURE',

  LOGOUT_USER: 'LOGOUT_USER'
};

export const ModalAction = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL'
};