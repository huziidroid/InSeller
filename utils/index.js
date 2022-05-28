import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import { Linking, Alert, BackHandler } from "react-native";

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

const _getLocationAsync = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    /* If user hasn't granted permission to geolocate himself herself */
    Alert.alert(
      "User location not detected",
      "You haven't granted permission to detect your location. Please Provide location access",
      [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
    );
    return;
  } else {
    /* If user has granted permission to geolocate himself herself */
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    return {
      status: true,
      location: location,
    };
  }
};

export const storeLocation = (setLocation) => {
  _getLocationAsync()
    .then((location) => {
      setLocation(location.location.coords);
    })
    .catch((error) => {
      Alert.alert(
        error.message,
        "You haven't granted permission to detect your location.",
        [
          {
            text: "Allow For permission",
            onPress: () => {
              _getLocationAsync()
                .then((location) => {
                  if (location) {
                    setLocation(location.location.coords);
                  }
                })
                .catch((err) => {
                  Alert.alert(
                    err.message,
                    "You haven't granted permission to detect your location.\nRestarting your application",
                    [
                      {
                        text: "Ok",
                        onPress: () => {
                          BackHandler.exitApp();
                        },
                      },
                    ]
                  );
                });
            },
          },
        ]
      );
    });
};
