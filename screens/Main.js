import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";
import { Colors } from "../colors";

const Main = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontFamily: "Poppins_700Bold",
          color: Colors.primaryColor,
        }}
      >
        InSeller
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Give your local shop Online Presence</Text>
        <Text>Take Pictures and Start Selling</Text>
      </View>

      <Button
        title="Create Your Online Store"
        onPress={() => navigation.navigate("login")}
      ></Button>
    </View>
  );
};

export default Main;
