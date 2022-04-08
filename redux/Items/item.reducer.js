import * as actionTypes from "./item.constant";

const initialState = {
  isLoading: false,
  error: false,
  items: [],
  errorMessage: "",
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SET_ITEMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.error,
      };
    case actionTypes.SET_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        items: action.payload.response.items,
      };
    default:
      return state;
  }
};

export default itemReducer;
