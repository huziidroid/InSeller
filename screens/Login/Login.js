import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider, CheckBox } from "react-native-elements";
import { Colors } from "../../colors";
import { useSignInMutation } from "../../redux/slice/apiSlice";
import { authSignIn } from "../../api/middlewares/user.middleware";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/userSlice";
import { ScreenWrapper } from "react-native-screen-wrapper";
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
import { addToast } from "../../utils";

const Login = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const passwordRef = useRef();
  const [checked, setChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rightIcon, setRightIcon] = useState("eye-off-outline");
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();

  const handleLogin = async (phone_number, password) => {
    const { status, message } = authSignIn(phone_number, password);
    if (status) {
      try {
        const { error, data } = await signIn({
          phone_number: phone_number,
          password: password,
        });
        if (error) {
          addToast(error.data?.message, true);
        } else {
          if (checked) {
            rememberMe(data?.user);
          }
          dispatch(setUser(data.user));
          addToast(data?.message, false);
          navigation.reset({
            index: 0,
            routes: [{ name: "drawer" }],
          });
        }
      } catch (error) {
        addToast(error.message, true);
      }
    } else {
      addToast(message, true);
    }
  };
  const rememberMe = async (user) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (error) {
      addToast(error.message);
    }
  };
  const renderRightIcon = () => (
    <TouchableOpacity>
      <MaterialCommunityIcons
        name={rightIcon}
        size={17}
        onPress={() => {
          setVisible(!visible);
          setRightIcon(visible ? "eye-outline" : "eye-off-outline");
        }}
        color="black"
      />
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper barStyle="light-content" statusBarColor={Colors.secondary}>
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
              onPress={() => handleLogin(phone, password)}
            ></StyledSignInButton>
            <Divider inset={true} insetType="middle" />
            <StyledSignUpButton
              title="Signup"
              type="outline"
              onPress={() => navigation.navigate("signup")}
            ></StyledSignUpButton>
          </ScrollView>
        </FooterWrapper>
      </Container>
    </ScreenWrapper>
  );
};

export default Login;
