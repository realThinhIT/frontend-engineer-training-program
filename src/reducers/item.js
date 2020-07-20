import { ItemAction, ModalAction } from '../constants/actions';
import config from '../config';

export const initialState = {
  isLoading: true,
  error: null,
  ids: [],
  byId: {},

  currentItemId: null,

  page: 1,
  perPage: config.PAGINATION_ITEMS_PER_PAGE,
  totalPage: 1,
  totalItems: 0,

  interactingItemId: null,
  isProcessing: false,
  interactionError: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ItemAction.FETCH_ITEMS:
      return {
        ...state,
        isLoading: true,
        error: null,

        page: action.payload.page,
        perPage: action.payload.perPage
      };

    case ItemAction.FETCH_ITEMS_SUCCESS: {
      const ids = [];
      const byId = {};

      for (const item of action.payload.items) {
        ids.push(item.id);
        byId[item.id] = item;
      }

      return {
        ...state,
        isLoading: false,
        error: null,
        ids,
        byId,
        page: action.payload.page,
        totalPage: action.payload.total_pages,
        totalItems: action.payload.total_items
      };
    }

    case ItemAction.FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        ids: [],
        byId: {}
      };

    case ItemAction.FETCH_ITEM:
      return {
        ...state,
        isLoading: true,
        error: null,
        currentItemId: action.payload.itemId
      };

    case ItemAction.FETCH_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...action.payload
          }
        }
      };

    case ItemAction.FETCH_ITEM_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ItemAction.RESET_STATE:
      return {
        ...state,
        isLoading: false,
        error: null
      };

    case ItemAction.EDIT_ITEM:
    case ItemAction.CONFIRM_DELETE_ITEM:
      return {
        ...state,
        interactingItemId: action.payload.itemId
      };

    case ModalAction.HIDE_MODAL:
      return {
        ...state,
        interactingItemId: null,
        isProcessing: false,
        interactionError: null
      };

    case ItemAction.ADD_ITEM:
    case ItemAction.UPDATE_ITEM:
    case ItemAction.DELETE_ITEM:
      return {
        ...state,
        isProcessing: true,
        interactionError: null
      };

    case ItemAction.ADD_ITEM_SUCCESS:
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

    case ItemAction.ADD_ITEM_FAILURE:
    case ItemAction.DELETE_ITEM_FAILURE:
      return {
        ...state,
        isProcessing: false,
        interactionError: action.payload
      };

    case ItemAction.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        interactionError: null,

        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            ...action.payload
          }
        }
      };

    case ItemAction.UPDATE_ITEM_FAILURE:
      return {
        ...state,
        isProcessing: false,
        interactionError: action.payload
      };

    case ItemAction.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        interactionError: null
      };

    default:
      return state;
  }
};

export const selectItems = state => state.ids.map(id => state.byId[id]) || [];

export const selectCurrentItem = state => {
  if (state.byId && state.currentItemId) {
    return state.byId[state.currentItemId] || null;
  }

  return null;
};

export const selectInteractingItem = state => state.byId[state.interactingItemId] || null;
