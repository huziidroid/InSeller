import * as actionTypes from "./item.constant";

const initialState = {
  isLoading: false,
  error: false,
  items: [],
  errorMessage: "",
  successMessage: "",
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: "",
        successMessage: "",
      };
    case actionTypes.SET_ITEMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.error,
        successMessage: "",
      };
    case actionTypes.SET_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        items: action.payload.response.items,
        errorMessage: "",
      };
    case actionTypes.ADD_ITEM_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: "",
        successMessage: "",
      };
    case actionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        items: [...state.items, action.payload.response.item],
        successMessage: action.payload.response.message,
      };
    case actionTypes.ADD_ITEM_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.error,
        successMessage: "",
      };

    default:
      return state;
  }
};

export default itemReducer;
