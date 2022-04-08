import * as actionTypes from "./item.constant";
import * as itemMiddleware from "../../api/middlewares/item.middleware";
import axios from "axios";
import { BASE_URL } from "../../api/config";

export const setItemsRequest = () => {
  return {
    type: actionTypes.SET_ITEMS_REQUEST,
  };
};

export const setItemsSuccess = (response) => {
  return {
    type: actionTypes.SET_ITEMS_SUCCESS,
    payload: {
      response: response,
    },
  };
};

export const setItemsFailure = (error) => {
  return {
    type: actionTypes.SET_ITEMS_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const setItems = (store_id) => {
  console.log("store_id", store_id);
  return (dispatch) => {
    dispatch(setItemsRequest());
    axios
      .get(`${BASE_URL}/api/user/store/item/get-all-items/${store_id}`)
      .then((response) => {
        console.log("response", response);
        dispatch(setItemsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(setItemsFailure(error.response.data.message));
      });
  };
};
