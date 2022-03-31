import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderDetails from "../screens/OrderDetails";
import Login from "../screens/Login";
import Main from "../screens/Main";
import AddItem from "../screens/AddItem";
import Signup from "../screens/Signup";
import DrawerNavigator from "./DrawerNavigator";
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
      <Root.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Root.Screen
        name="signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Root.Screen
        name="drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Root.Screen name="OrderDetails" component={OrderDetails} />
      <Root.Screen name="Item-Add" component={AddItem} />
    </Root.Navigator>
  );
};

export default RootNavigator;
