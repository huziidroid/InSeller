import * as actionTypes from "./user.constant";

const initialState = {
  isLoading: false,
  error: false,
  user: {},
  token: "",
  errorMessage: "",
  location: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.error,
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        user: action.payload.response.user,
        token: action.payload.response.accessToken,
        errorMessage: "",
      };
    case actionTypes.SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.error,
      };
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        user: action.payload.response.user,
        token: action.payload.response.accessToken,
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        user: {},
        token: "",
      };

    case actionTypes.USER_LOCATION:
      return {
        ...state,
        location: action.payload.location,
      };

    default:
      return state;
  }
};

export default userReducer;
