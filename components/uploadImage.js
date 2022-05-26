import axios from "axios";
const BASE_URL = "https://api.cloudinary.com/v1_1/docclrbhz/image/upload";
export const uploadImage = async (image, cloudnairy_preset) => {
  axios
    .post(BASE_URL, {
      file: image,
      upload_preset: cloudnairy_preset,
    })
    .then((result) => {
      return result.data.url;
    })
    .catch((err) => {
      console.log(err);
    });
};
