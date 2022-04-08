import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Category from "../screens/Category";
import { Ionicons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../colors";
import AddCategory from "../screens/AddCategory";

const CategoryNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Category-List"
        component={Category}
        options={{
          headerTitle: "Categories",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Add-Category")}
              style={{
                marginRight: 10,
              }}
            >
              <Ionicons name="add-outline" size={27} color={Colors.secondary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Add-Category" component={AddCategory} />
    </Stack.Navigator>
  );
};

export default CategoryNavigator;
