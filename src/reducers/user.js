import { UserAction, ModalAction } from '../constants/actions';

export const initialState = {
  isFetching: false,
  userId: null,
  name: '',

  isRegistering: false,
  registerError: null,

  isLoggingIn: false,
  loginError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UserAction.REGISTER_USER:
      return {
        ...state,
        isRegistering: true,
        registerError: null
      };

    case UserAction.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        registerError: null
      };

    case UserAction.REGISTER_USER_FAILURE:
      return {
        ...state,
        isRegistering: false,
        registerError: action.payload
      };

    case UserAction.AUTHENTICATE_USER:
      return {
        ...state,
        isLoggingIn: true,
        loginError: null,
      };

    case UserAction.AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        loginError: null
      };
    
    case UserAction.AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        loginError: action.payload
      };

    case UserAction.FETCH_CURRENT_USER:
      return {
        ...state,
        isFetching: true,
      };

    case UserAction.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userId: action.payload.id,
        name: action.payload.name
      };

    case UserAction.FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        userId: null,
        name: ''
      };

      // case UserAction.UPDATE_CURRENT_USER: 
      //   return {
      //     ...state,
      //     userId: action.payload.userId,
      //     name: action.payload.name
      //   };

    case UserAction.LOGOUT_USER:
      return {
        ...state,
        userId: null,
        name: ''
      };

    case ModalAction.HIDE_MODAL:
      return {
        ...state,
        isRegistering: false,
        registerError: null,
        isLoggingIn: false,
        loginError: null
      };

    default:
      return state;
  }
};
