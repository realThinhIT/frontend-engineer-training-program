import { ItemAction } from '../constants/actions';
import { calculateOffset } from '../utils/pagination';
import request from '../utils/request';
import config from '../config';

export const fetchItem = (
  categoryId,
  itemId
) => ({
  type: ItemAction.FETCH_ITEM,
  promise: request(`/categories/${categoryId}/items/${itemId}`),
  payload: {
    categoryId,
    itemId
  }
});

export const fetchItems = (
  categoryId,
  page = 1,
  perPage = config.PAGINATION_ITEMS_PER_PAGE
) => ({
  type: ItemAction.FETCH_ITEMS,
  promise: request(`/categories/${categoryId}/items?limit=${perPage}&offset=${calculateOffset(page, perPage)}`),
  payload: {
    categoryId,
    page,
    perPage
  }
});

export const openAddModal = () => ({
  type: ItemAction.CREATE_ITEM
});

export const openEditModal = (itemId, categoryId) => ({
  type: ItemAction.EDIT_ITEM,
  payload: {
    itemId,
    categoryId
  }
});

export const openDeleteModal = (itemId, categoryId) => ({
  type: ItemAction.CONFIRM_DELETE_ITEM,
  payload: {
    itemId,
    categoryId
  }
});

export const addItem = (categoryId, itemData) => ({
  type: ItemAction.ADD_ITEM,
  promise: request(`/categories/${categoryId}/items`, 'POST', itemData)
});

export const updateItem = (categoryId, itemId, itemData) => ({
  type: ItemAction.UPDATE_ITEM,
  promise: request(`/categories/${categoryId}/items/${itemId}`, 'PUT', itemData)
});

export const deleteItem = (categoryId, itemId) => ({
  type: ItemAction.DELETE_ITEM,
  promise: request(`/categories/${categoryId}/items/${itemId}`, 'DELETE')
});

export const resetState = () => ({
  type: ItemAction.RESET_STATE
});
