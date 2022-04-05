import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Divider, CheckBox } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { Colors } from "../colors";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../redux/User/user.action";
import Toast from "react-native-root-toast";

const Login = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true);
  const passwordRef = useRef();
  const [checked, setChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.error) {
      Toast.show(user.errorMessage, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }, [user.error, user.errorMessage]);

  useEffect(() => {
    if (user.user !== null) {
      Toast.show("Login Successfully", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "drawer" }],
      });
      navigation.navigate("drawer");
    }
  }, [user.user]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_label}>SignIn to store</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <ScrollView>
          <Input
            keyboardType="phone-pad"
            style={styles.textInput}
            label="Phone number"
            labelStyle={styles.textInput_label}
            placeholder="Enter you mobile number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            keyboardType="twitter"
            style={styles.textInput}
            secureTextEntry={visible}
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            ref={passwordRef}
            rightIcon={
              <TouchableOpacity>
                {visible ? (
                  <MaterialCommunityIcons
                    name="seed-off-outline"
                    size={17}
                    onPress={() => setVisible(!visible)}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="seed-outline"
                    size={17}
                    onPress={() => setVisible(!visible)}
                    color="black"
                  />
                )}
              </TouchableOpacity>
            }
            labelStyle={styles.textInput_label}
            placeholder="Enter password"
          />

          <CheckBox
            title="Remember me"
            checked={checked}
            checkedColor={Colors.secondary}
            onPress={() => setChecked(!checked)}
          />
          <Button
            title="SignIn"
            // loading={loading}
            buttonStyle={styles.button}
            onPress={() => {
              dispatch(SignIn(phone, password));
            }}
          ></Button>
          <Divider inset={true} insetType="middle" />
          <Button
            title="Signup"
            type="outline"
            buttonStyle={{
              borderRadius: 10,
              height: 50,
              marginVertical: 15,
              marginHorizontal: 10,
            }}
            onPress={() => {
              navigation.navigate("signup");
            }}
          ></Button>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingBottom: 50,
    justifyContent: "flex-end",
  },
  footer: {
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header_label: {
    fontSize: 25,
    fontFamily: "Poppins_700Bold",
    color: Colors.primary,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    fontFamily: "Poppins_400Regular",
    marginVertical: 5,
    height: 50,
  },
  textInput_label: {
    color: Colors.textColor,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    backgroundColor: Colors.secondary,
    marginTop: 40,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 10,
  },
});

export default Login;
