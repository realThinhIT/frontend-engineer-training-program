import { CategoryAction } from '../constants/actions';
import request from '../utils/request';
import { calculateOffset } from '../utils/pagination';
import config from '../config';

export const fetchCategories = (page = 1, perPage = config.PAGINATION_ITEMS_PER_PAGE) => ({
  type: CategoryAction.FETCH_CATEGORIES,
  promise: request(`/categories?offset=${calculateOffset(page, perPage)}&limit=${perPage}`, 'GET')
});

export const selectCategory = categoryId => ({
  type: CategoryAction.SELECT_CATEGORY,
  payload: {
    categoryId
  }
});

export const openAddModal = () => ({
  type: CategoryAction.CREATE_CATEGORY
});

export const addCategory = (categoryData) => ({
  type: CategoryAction.ADD_CATEGORY,
  promise: request('/categories', 'POST', categoryData)
});
