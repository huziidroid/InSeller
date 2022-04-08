import * as actionTypes from "./user.constant";
import * as userMiddleware from "../../api/middlewares/user.middleware";
import axios from "axios";
import { BASE_URL } from "../../api/config";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const SignUpRequest = () => {
  return {
    type: actionTypes.SIGN_UP_REQUEST,
  };
};

export const SignUpError = (error) => {
  return {
    type: actionTypes.SIGN_UP_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const SignUpSuccess = (response) => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    payload: {
      response: response,
    },
  };
};

export const SignUp = (
  name,
  phone_number,
  address,
  location,
  category_id,
  password
) => {
  return (dispatch) => {
    dispatch(SignUpRequest());
    const validate = userMiddleware.authSignUp(
      name,
      phone_number,
      address,
      location,
      category_id,
      password
    );
    if (validate.status) {
      const body = {
        name: name,
        phone_number: phone_number,
        address: address,
        location: location,
        category_id: category_id,
        password: password,
      };
      axios
        .post(`${BASE_URL}/api/user/store/signup`, body)
        .then((res) => {
          dispatch(SignUpSuccess(res.data));
        })
        .catch((err) => {
          dispatch(SignUpError(err.response.data.message));
        });
    } else {
      dispatch(SignUpError(validate.message));
    }
  };
};

export const SignInRequest = () => {
  return {
    type: actionTypes.SIGN_IN_REQUEST,
  };
};

export const SignInSuccess = (response) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: {
      response: response,
    },
  };
};

export const SignInFailure = (error) => {
  return {
    type: actionTypes.SIGN_IN_FAILURE,
    payload: {
      error: error,
    },
  };
};

export const SignIn = (phone_number, password) => {
  return (dispatch) => {
    dispatch(SignInRequest());
    const validate = userMiddleware.authSignIn(phone_number, password);
    if (validate.status) {
      const body = {
        phone_number: phone_number,
        password: password,
      };
      axios
        .post(`${BASE_URL}/api/user/store/signin`, body)
        .then((res) => {
          dispatch(SignInSuccess(res.data));
        })
        .catch((err) => {
          dispatch(SignInFailure(err.response.data.message));
        });
    } else {
      dispatch(SignInFailure(validate.message));
    }
  };
};

export const signOut = () => {
  const { removeItem } = useAsyncStorage("@user");
  removeItem();
  return {
    type: actionTypes.SIGN_OUT,
  };
};

export const userLocation = (location) => {
  return {
    type: actionTypes.USER_LOCATION,
    payload: {
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    },
  };
};
