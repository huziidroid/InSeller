import * as actionTypes from "./category.constant";

const initialState = {
  isLoading: false,
  error: false,
  categories: [],
  errorMessage: "",
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SET_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.error,
      };
    case actionTypes.SET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        categories: action.payload.response.categories,
      };
    default:
      return state;
  }
};

export default categoryReducer;
