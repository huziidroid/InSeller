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
        dispatch(setItemsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(setItemsFailure(error.response.data.message));
      });
  };
};

export const addItemRequest = () => {
  return {
    type: actionTypes.ADD_ITEM_REQUEST,
  };
};

export const addItemSuccess = (response) => {
  return {
    type: actionTypes.ADD_ITEM_SUCCESS,
    payload: {
      response: response,
    },
  };
};

export const addItemFailure = (error) => {
  return {
    type: actionTypes.ADD_ITEM_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const addItem = (
  name,
  category_id,
  description,
  unit,
  selling_price,
  discount_price,
  cost_price,
  quantity,
  store_id,
  token,
  images,
  base64
) => {
  return (dispatch) => {
    dispatch(addItemRequest());
    const validate = itemMiddleware.validateItem(
      name,
      category_id,
      description,
      selling_price,
      unit
    );

    if (validate.status) {
      let files = [];
      if (images.length > 0) {
        base64.forEach((element, index) => {
          axios
            .post("https://api.cloudinary.com/v1_1/dg0rixht0/image/upload", {
              file: element,
              upload_preset: "items_images",
            })
            .then((result) => {
              files.push(result.data.url);
              if (files.length === base64.length) {
                axios
                  .post(
                    `${BASE_URL}/api/user/store/item/add-item`,
                    {
                      name: name,
                      category_id: category_id,
                      description: description,
                      unit: unit,
                      selling_price: selling_price,
                      discount_price: discount_price,
                      cost_price: cost_price,
                      quantity: quantity,
                      store_id: store_id,
                      images: files,
                    },
                    {
                      headers: {
                        "x-access-token": token,
                      },
                    }
                  )
                  .then((response) => {
                    dispatch(addItemSuccess(response.data));
                  })
                  .catch((error) => {
                    dispatch(addItemFailure(error.response.data.message));
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } else {
        axios
          .post(
            `${BASE_URL}/api/user/store/item/add-item`,
            {
              name: name,
              category_id: category_id,
              description: description,
              unit: unit,
              selling_price: selling_price,
              discount_price: discount_price,
              cost_price: cost_price,
              quantity: quantity,
              store_id: store_id,
              images: [],
            },
            {
              headers: {
                "x-access-token": token,
              },
            }
          )
          .then((response) => {
            dispatch(addItemSuccess(response.data));
          })
          .catch((error) => {
            dispatch(addItemFailure(error.response.data.message));
          });
      }
    } else {
      dispatch(addItemFailure(validate.message));
    }
  };
};
