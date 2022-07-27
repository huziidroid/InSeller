import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./Navigation/RootNavigator";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Toast from "react-native-toast-message";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "./utils";

import {
  useFonts,
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import NetInfo from "@react-native-community/netinfo";
import Pusher from "pusher-js/react-native";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

const pusher = new Pusher("1fa354c0285989de6e5a", {
  cluster: "us2",
});
const channel = pusher.subscribe("orders");
channel.bind("new-order", async (data) => {
  alert("New Order Received");
  // schedulePushNotification("New order", "New order received");
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    registerForPushNotificationsAsync();
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <ActionSheetProvider>
            <SafeAreaView
              style={{
                flex: 1,
              }}
            >
              <RootNavigator />
              <Toast />
            </SafeAreaView>
          </ActionSheetProvider>
        </NavigationContainer>
      </Provider>
    );
  }
}
