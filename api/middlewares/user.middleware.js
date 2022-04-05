export const authSignUp = (
  name,
  phone_number,
  address,
  location,
  category_id,
  password
) => {
  if (name.length === 0 || name.length < 3) {
    return {
      status: false,
      message: "Please enter proper name",
    };
  } else if (phone_number.length === 0) {
    return {
      status: false,
      message: "Please enter your phone number",
    };
  } else if (address.length === 0) {
    return {
      status: false,
      message: "Please enter your address",
    };
  } else if (location === null) {
    return {
      status: false,
      message: "Please select your location",
    };
  } else if (category_id === 0) {
    return {
      status: false,
      message: "Please select your store type",
    };
  } else if (password.length <= 0) {
    return {
      status: false,
      message: "Please enter your password",
    };
  } else {
    return {
      status: true,
      message: "",
    };
  }
};

export const authSignIn = (phone_number, password) => {
  if (phone_number.length === 0) {
    return {
      status: false,
      message: "Please enter your phone number",
    };
  } else if (password.length === 0) {
    return {
      status: false,
      message: "Please enter your password",
    };
  } else {
    return {
      status: true,
      message: "",
    };
  }
};
