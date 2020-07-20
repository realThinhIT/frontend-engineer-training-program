import { CategoryAction, ItemAction } from '../constants/actions';

export const initialState = {
  isLoading: true,
  error: null,
  ids: [],
  byId: {},
  currentCategoryId: null,

  totalItems: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CategoryAction.FETCH_CATEGORIES:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case CategoryAction.FETCH_CATEGORIES_SUCCESS: {
      const ids = [];
      const byId = {};

      for (const category of action.payload.categories) {
        ids.push(category.id);
        byId[category.id] = category;
      }

      return {
        ...state,
        isLoading: false,
        error: null,
        ids,
        byId,

        totalItems: action.payload.total_categories
      };
    }

    case CategoryAction.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        ids: [],
        byId: {}
      };

    case CategoryAction.ADD_CATEGORY:
      return {
        ...state,
        isProcessing: true,
        interactionError: null
      };

    case CategoryAction.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        interactionError: null,

        ids: [
          ...state.ids,
          action.payload.id
        ],
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload
        }
      };

    case CategoryAction.ADD_ITEM_FAILURE:
      return {
        ...state,
        isProcessing: false,
        interactionError: action.payload
      };

    case CategoryAction.SELECT_CATEGORY:
      return {
        ...state,
        currentCategoryId: action.payload.categoryId
      };

    case ItemAction.EDIT_ITEM: {
      if (action.payload.categoryId) {
        return {
          ...state,
          currentCategoryId: action.payload.categoryId
        };
      }

      return state;
    }

    default:
      return state;
  }
};

export const selectCategories = state => state.ids.map(id => state.byId[id]) || [];
export const selectCurrentCategory = state => state.byId[state.currentCategoryId] || {};
