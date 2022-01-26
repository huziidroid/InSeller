import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Order from "../screens/Order/Order";

const Stack = createNativeStackNavigator();

const OrderNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Order-List"
        component={Order}
        options={{
          headerTitle: "Orders",
        }}
      />
    </Stack.Navigator>
  );
};

export default OrderNavigator;
