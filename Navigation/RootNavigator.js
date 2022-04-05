import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderDetails from "../screens/OrderDetails";
import Login from "../screens/Login";
import Main from "../screens/Main";
import AddItem from "../screens/AddItem";
import Signup from "../screens/Signup";
import DrawerNavigator from "./DrawerNavigator";
const Root = createNativeStackNavigator();
import { useSelector } from "react-redux";

const RootNavigator = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Root.Navigator initialRouteName={user === null ? "Main" : "drawer"}>
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
