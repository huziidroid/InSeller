import { Button, View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Account from "../screens/Account";
import Search from "../screens/Search";
import TabNavigator from "./TabNavigator";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../colors";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="tab"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Entypo name="home" size={24} color={Colors.secondary} />
          ),
          drawerLabel: "Home",
          drawerActiveBackgroundColor: Colors.drawerLabel,
          drawerLabelStyle: {
            color: Colors.secondary,
            fontFamily: "Poppins_500Medium",
          },
        }}
      />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          drawerIcon: () => (
            <AntDesign name="profile" size={24} color={Colors.secondary} />
          ),
          drawerActiveBackgroundColor: Colors.drawerLabel,
          drawerLabelStyle: {
            color: Colors.secondary,
            fontFamily: "Poppins_500Medium",
          },
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          drawerIcon: () => (
            <Feather name="search" size={24} color={Colors.secondary} />
          ),
          drawerActiveBackgroundColor: Colors.drawerLabel,
          drawerLabelStyle: {
            color: Colors.secondary,
            fontFamily: "Poppins_500Medium",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
