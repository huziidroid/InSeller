import * as actionTypes from "./constant";
import axios from "axios";
import { BASE_URL } from "../../api/config";

export const getCategories = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_STORE_CATEGORY_REQUEST,
    });
    axios
      .get(`${BASE_URL}/api/admin/store-category/get-all`)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_STORE_CATEGORY_SUCCESS,
          payload: {
            response: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
        dispatch({
          type: actionTypes.GET_STORE_CATEGORY_ERROR,
          payload: {
            error: error.message,
          },
        });
      });
  };
};
