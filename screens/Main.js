import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Colors } from "../colors";
import { useDispatch, useSelector } from "react-redux";
import { storeLocation } from "../components/user-location";

const Main = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    storeLocation(dispatch);
  }, []);

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
        title="Get Started"
        onPress={() =>
          Object.keys(user.user).length !== 0
            ? navigation.navigate("drawer")
            : navigation.navigate("login")
        }
      ></Button>
    </View>
  );
};

export default Main;
