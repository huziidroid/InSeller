import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Category from "../screens/CategoryList/Category";
import { Ionicons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../colors";
import AddCategory from "../screens/AddCategory/AddCategory";

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
              onPress={() => navigation.navigate("Category-Add")}
              style={{
                marginRight: 10,
              }}
            >
              <Ionicons name="add-outline" size={27} color={Colors.secondary} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoryNavigator;
