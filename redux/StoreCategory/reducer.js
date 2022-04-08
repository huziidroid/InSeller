import * as actionTypes from "./constant";

initialState = {
  isLoading: false,
  categories: [],
  error: false,
  errorMessage: "",
};

const StoreCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload.response.categories,
      };
    case actionTypes.GET_CATEGORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.error,
      };
    default:
      return state;
  }
};

export default StoreCategoryReducer;
