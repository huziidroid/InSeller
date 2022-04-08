import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ItemNavigator from "./ItemNavigator.js";
import OrderNavigator from "./OrderNavigator.js";
import { Colors } from "../colors";
import * as Animatable from "react-native-animatable";
import Icon, { Icons } from "../components/Icons";

import Home from "../screens/Home";
import CategoryNavigator from "./CategoryNavigator.js";
const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: "home",
    label: "Home",
    type: Icons.Entypo,
    icon: "home",
    component: Home,
    color: Colors.secondary,
    alphaClr: Colors.secondaryAlpha,
  },
  {
    route: "item",
    label: "Items",
    type: Icons.FontAwesome5,
    icon: "stack-overflow",
    component: ItemNavigator,
    color: Colors.secondary,
    alphaClr: Colors.secondaryAlpha,
  },
  {
    route: "category",
    label: "Categories",
    type: Icons.MaterialIcons,
    icon: "category",
    component: CategoryNavigator,
    color: Colors.secondary,
    alphaClr: Colors.secondaryAlpha,
  },
  {
    route: "order",
    label: "Orders",
    type: Icons.FontAwesome,
    icon: "reorder",
    component: OrderNavigator,
    color: Colors.secondary,
    alphaClr: Colors.secondaryAlpha,
  },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}
    >
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: item.color, borderRadius: 10 },
          ]}
        />
        <View
          style={[
            styles.btn,
            { backgroundColor: focused ? null : item.alphaClr },
          ]}
        >
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? Colors.white : Colors.secondary}
          />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: Colors.white,
                  paddingHorizontal: 8,
                }}
              >
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: "absolute",
          // bottom: 16,
          // right: 16,
          // left: 16,
          borderRadius: 10,
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 16,
  },
});
export default TabNavigator;
