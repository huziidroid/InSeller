import { Button, View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Account from "../screens/Account";
import Search from "../screens/Search";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="home">
      <Drawer.Screen
        name="home"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Search" component={Search} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
