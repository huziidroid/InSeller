export const validateCategory = (name) => {
  if (name.length === 0) {
    return {
      status: false,
      message: "Please enter category name",
    };
  } else {
    return {
      status: true,
      message: "",
    };
  }
};

export const uplaodImage = (image) => {};
