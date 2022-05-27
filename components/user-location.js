// import * as Location from "expo-location";
// import { Linking, Alert, BackHandler } from "react-native";
// // import { userLocation } from "../redux/User/user.action";

// export const _getLocationAsync = async () => {
//   let { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== "granted") {
//     /* If user hasn't granted permission to geolocate himself herself */
//     Alert.alert(
//       "User location not detected",
//       "You haven't granted permission to detect your location. Please Provide location access",
//       [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
//     );
//     return;
//   } else {
//     /* If user has granted permission to geolocate himself herself */
//     let location = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.BestForNavigation,
//     });
//     return location;
//   }
// };

// export const storeLocation = (setLocation) => {
//   _getLocationAsync()
//     .then((location) => {
//       setLocation(location);
//     })
//     .catch((error) => {
//       Alert.alert(
//         error.message,
//         "You haven't granted permission to detect your location.",
//         [
//           {
//             text: "Allow For permission",
//             onPress: () => {
//               _getLocationAsync()
//                 .then((location) => {
//                   if (location) {
//                     setLocation(location);
//                   }
//                 })
//                 .catch((err) => {
//                   Alert.alert(
//                     err.message,
//                     "You haven't granted permission to detect your location.\nRestarting your application",
//                     [
//                       {
//                         text: "Ok",
//                         onPress: () => {
//                           BackHandler.exitApp();
//                         },
//                       },
//                     ]
//                   );
//                 });
//             },
//           },
//         ]
//       );
//     });
// };
