import React from "react";
import { View, Text } from "react-native";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import Order from "../screens/Order/Order.js";
import Search from "../screens/Search/Search.js";
import HomeNavigator from "./HomeNavigator.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountNavigator from "./AccountNavigator.js";
import ItemNavigator from "./ItemNavigator.js";
import OrderNavigator from "./OrderNavigator.js";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5F939A",
        tabBarInactiveTintColor: "#363636",
        // tabBarStyle: {
        //   position: "absolute",
        //   bottom: 10,
        //   left: 20,
        //   right: 20,
        //   overflow: "hidden",
        //   height: 65,
        //   backgroundColor: "white",
        //   borderRadius: 20,
        //   shadowColor: "#7f5df0",
        //   shadowOffset: {
        //     width: 0,
        //     height: 10,
        //   },
        //   shadowOpacity: 0.25,
        //   shadowRadius: 3.5,
        //   elevation: 2,
        // },
        // tabBarLabelStyle: {
        //   marginBottom: 5,
        // },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Item"
        component={ItemNavigator}
        options={{
          tabBarLabel: "Item",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="stack-overflow" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderNavigator}
        options={{
          tabBarLabel: "Order",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="reorder" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
