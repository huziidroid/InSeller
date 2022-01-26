import React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import OrderDetails from "../screens/OrderDetails/OrderDetails";
import Login from "../screens/Login/Login";
import { AntDesign } from "@expo/vector-icons";
import OTP from "../screens/OTP/OTP";
import Main from "../screens/Main/Main";
import AddItem from "../screens/Item/AddItem";
const Root = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Root.Navigator>
      <Root.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Root.Screen name="Login" component={Login} />
      <Root.Screen
        name="Tab"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Root.Screen name="OrderDetails" component={OrderDetails} />
      <Root.Screen name="Item-Add" component={AddItem} />
      <Root.Screen name="OTP Verification" component={OTP} />
    </Root.Navigator>
  );
};

export default RootNavigator;
