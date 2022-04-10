import * as actionTypes from "./category.constant";
import axios from "axios";
import { BASE_URL } from "../../api/config";
import * as categoryMiddleware from "../../api/middlewares/category.middleware";

export const setCategoriesRequest = () => {
  return {
    type: actionTypes.GET_CATEGORIES_REQUEST,
  };
};

export const setCategoriesSuccess = (response) => {
  return {
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: {
      response: response,
    },
  };
};

export const setCategoriesFailure = (error) => {
  return {
    type: actionTypes.GET_CATEGORIES_FAILURE,
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
        dispatch(setCategoriesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(setCategoriesFailure(error.response.data.message));
      });
  };
};

export const addCategoryRequest = () => {
  return {
    type: actionTypes.ADD_CATEGORY_REQUEST,
  };
};

export const addCategorySuccess = (response) => {
  return {
    type: actionTypes.ADD_CATEGORY_SUCCESS,
    payload: {
      response: response,
    },
  };
};

export const addCategoryFailure = (error) => {
  return {
    type: actionTypes.ADD_CATEGORY_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const addCategory = (store_id, token, category_name, image, base64) => {
  return (dispatch) => {
    dispatch(addCategoryRequest());
    if (categoryMiddleware.validateCategory(category_name).status) {
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      if (image !== "") {
        axios
          .post(
            "https://api.cloudinary.com/v1_1/dg0rixht0/image/upload",
            {
              file: base64,
              upload_preset: "categories_images",
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((result) => {
            image = result.data.url;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      axios
        .post(
          `${BASE_URL}/api/user/store/item/category/add-category/`,
          {
            store_id: store_id,
            name: category_name,
            image: image,
          },
          config
        )
        .then((response) => {
          dispatch(addCategorySuccess(response.data));
        })
        .catch((error) => {
          dispatch(addCategoryFailure(error.response.data.message));
        });
    } else {
      dispatch(addCategoryFailure("Please enter category name"));
    }
  };
};
