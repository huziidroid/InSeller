import * as actionTypes from "./category.constant";

const initialState = {
  isLoading: false,
  error: false,
  categories: [],
  errorMessage: "",
  successMessage: "",
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: "",
        successMessage: "",
      };
    case actionTypes.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.error,
        successMessage: "",
      };
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        categories: action.payload.response.categories,
        errorMessage: "",
        successMessage: "",
      };
    case actionTypes.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.error,
        successMessage: "",
      };
    case actionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        errorMessage: "",
        successMessage: action.payload.response.message,
        categories: [...state.categories, action.payload.response.category],
      };
    case actionTypes.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        successMessage: "",
        errorMessage: "",
        successMessage: "",
        error: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
