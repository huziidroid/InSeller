import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

export const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 0.5,
    base64: true,
    maxHeight: 50,
    maxWidth: 50,
  });
  if (!result.cancelled) {
    return result;
  }
};

export const addToast = (message, isError) => {
  Toast.show({
    type: isError ? "error" : "success",
    position: "top",
    text1: isError ? "Error" : "Success 🎉",
    text2: message,
    visibilityTime: 3000,
  });
};
