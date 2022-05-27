import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider, CheckBox } from "react-native-elements";
import { Colors } from "../../colors";
import { useSignInMutation } from "../../redux/slice/apiSlice";
import { authSignIn } from "../../api/middlewares/user.middleware";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/userSlice";
import {
  Container,
  FooterWrapper,
  HeaderText,
  HeaderWrapper,
  StyledSignInButton,
  StyledSignUpButton,
  StyledInput,
  StyledInputTitle,
} from "./styles";

const Login = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const passwordRef = useRef();
  const [checked, setChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { isSuccess, isLoading, isError, data, error }] =
    useSignInMutation();
  const dispatch = useDispatch();

  const handleLogin = async (phone_number, password) => {
    const validation = authSignIn(phone_number, password);
    if (validation.status) {
      try {
        await signIn({
          phone_number: phone_number,
          password: password,
        });
      } catch (error) {
        Toast.show(error, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      }
    } else {
      Toast.show(validation.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  };
  const rememberMe = async (user) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (error) {
      Toast.show(error, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (checked) {
        rememberMe(data.user);
      }
      dispatch(setUser(data.user));
      Toast.show(data.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "drawer" }],
      });
    }
    if (isError) {
      Toast.show(error.data.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }, [isSuccess, isError]);

  const renderRightIcon = () => (
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
  );

  return (
    <Container>
      <HeaderWrapper>
        <HeaderText>SignIn to store</HeaderText>
      </HeaderWrapper>
      <FooterWrapper animation="fadeInUpBig">
        <ScrollView>
          <StyledInput
            keyboardType="phone-pad"
            label={<StyledInputTitle>Phone number</StyledInputTitle>}
            placeholder="Enter you mobile number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <StyledInput
            keyboardType="twitter"
            secureTextEntry={visible}
            label={<StyledInputTitle>Password</StyledInputTitle>}
            value={password}
            onChangeText={(text) => setPassword(text)}
            ref={passwordRef}
            rightIcon={renderRightIcon}
            placeholder="Enter password"
          />
          <CheckBox
            title="Remember me"
            checked={checked}
            checkedColor={Colors.secondary}
            onPress={() => setChecked(!checked)}
          />
          <StyledSignInButton
            title="SignIn"
            loading={isLoading}
            buttonStyle={styles.signInButton}
            onPress={() => {
              handleLogin(phone, password);
            }}
          ></StyledSignInButton>
          <Divider inset={true} insetType="middle" />
          <StyledSignUpButton
            title="Signup"
            type="outline"
            buttonStyle={styles.signUpButton}
            onPress={() => {
              navigation.navigate("signup");
            }}
          ></StyledSignUpButton>
        </ScrollView>
      </FooterWrapper>
    </Container>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: Colors.secondary,
    marginTop: 40,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  signUpButton: {
    borderRadius: 10,
    height: 50,
    marginVertical: 15,
    marginHorizontal: 10,
  },
});

export default Login;
