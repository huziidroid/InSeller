import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../screens/Account";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountScreen"
        component={Account}
        options={{
          headerTitle: "Account",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
