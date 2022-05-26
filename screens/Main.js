import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { Colors } from "../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/userSlice";

const getUser = async (dispatch) => {
  try {
    const user = JSON.parse(await AsyncStorage.getItem("@user")) || null;
    if (user !== null) {
      dispatch(setUser(user));
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

const Main = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    getUser(dispatch).then((isSuccess) => {
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate(isSuccess ? "drawer" : "Main");
      }, 1000);
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          animating={isLoading}
          color={Colors.secondary}
          size="large"
        />
      ) : (
        <>
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
            onPress={() => {
              navigation.navigate("login");
            }}
          ></Button>
        </>
      )}
    </View>
  );
};

export default Main;
