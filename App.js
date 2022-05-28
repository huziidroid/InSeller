import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./Navigation/RootNavigator";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Toast from "react-native-toast-message";

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

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
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
