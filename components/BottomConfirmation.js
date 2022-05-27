import React from "react";
import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../colors";
import { useDispatch } from "react-redux";
// import { signOut } from "../redux/User/user.action";

const BottomConfirmation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const handleLogout = () => {
  //   dispatch(signOut());
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "login" }],
  //   });
  // };
  return (
    <View>
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          fontSize: 15,
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        Are you sure you want to logout?
      </Text>

      <View
        style={{
          marginRight: 70,
          marginLeft: 70,
          marginTop: 100,
        }}
      >
        <Button
          title="Yes"
          color={Colors.secondary}
          // onPress={handleLogout}
        ></Button>
      </View>
    </View>
  );
};

export default BottomConfirmation;
