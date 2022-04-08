import * as actionTypes from "./category.constant";
import axios from "axios";
import { BASE_URL } from "../../api/config";
import * as categoryMiddleware from "../../api/middlewares/category.middleware";

export const setCategoriesRequest = () => {
  return {
    type: actionTypes.SET_CATEGORIES_REQUEST,
  };
};

export const setCategoriesSuccess = (response) => {
  return {
    type: actionTypes.SET_CATEGORIES_SUCCESS,
    payload: {
      response: response,
    },
  };
};

export const setCategoriesFailure = (error) => {
  return {
    type: actionTypes.SET_CATEGORIES_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const setCategories = (store_id) => {
  return (dispatch) => {
    dispatch(setCategoriesRequest());
    axios
      .get(
        `${BASE_URL}/api/user/store/item/category/get-all-categories/${store_id}`
      )
      .then((response) => {
        console.log("response", response.data);
        dispatch(setCategoriesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(setCategoriesFailure(error.response.data.message));
      });
  };
};
