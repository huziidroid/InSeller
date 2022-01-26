import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Item from "../screens/Item/Item";
import { Ionicons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../colors";

const ItemNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Item-List"
        component={Item}
        options={{
          headerTitle: "Items",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Item-Add")}
              style={{
                marginRight: 10,
              }}
            >
              <Ionicons
                name="add-outline"
                size={27}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Stack.Screen name="Item-Add" component={AddItem} /> */}
    </Stack.Navigator>
  );
};

export default ItemNavigator;
