import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { Colors } from "../../colors";
import {
  useGetStoreCategoriesQuery,
  useSignUpMutation,
} from "../../redux/slice/apiSlice";
import { authSignUp } from "../../api/middlewares/user.middleware";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/userSlice";
import {
  Container,
  FooterWrapper,
  HeaderLabel,
  HeaderWrapper,
  StyledInput,
  StyledSignInButton,
  StyledSignUpButton,
} from "./styles";
import { ScreenWrapper } from "react-native-screen-wrapper";
import { BottomActionSheet } from "../../components";
import { addToast, storeLocation } from "../../utils";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState({ key: "", label: "" });
  const [visible, setVisible] = useState(true);
  const [location, setLocation] = useState(null);
  const [rightIcon, setRightIcon] = useState("eye-off-outline");
  const { data: categories } = useGetStoreCategoriesQuery();
  const [signUp, { isLoading }] = useSignUpMutation();

  const options = [];
  categories?.forEach((category) =>
    options.push({ key: category.id, label: category.name })
  );

  options.push({ key: options.length, label: "Cancel" });
  const dispatch = useDispatch();

  useEffect(() => {
    storeLocation(setLocation);
    addToast("location fetched", false);
  }, []);

  const handleSignUp = async () => {
    const { status, message } = authSignUp(
      name,
      phone,
      address,
      location,
      category.key,
      password
    );
    if (status) {
      const { data, error } = await signUp({
        name: name,
        phone_number: phone,
        address: address,
        location: location,
        category_id: category.key,
        password: password,
      });
      if (error) {
        addToast(error?.data, true);
      } else {
        dispatch(setUser(data.user));
        addToast(data.message, false);
        navigation.reset({
          index: 0,
          routes: [{ name: "drawer" }],
        });
      }
    } else {
      addToast(message, true);
    }
  };

  const renderRightIcon = () => (
    <TouchableOpacity
      onPress={() => {
        setVisible(!visible);
        setRightIcon(visible ? "eye-outline" : "eye-off-outline");
      }}
    >
      <MaterialCommunityIcons name={rightIcon} size={17} color={Colors.black} />
    </TouchableOpacity>
  );

  const checkPassword = () => {
    if (password === confirmPassword) {
      handleSignUp();
    } else {
      addToast("Password does not match", true);
    }
  };
  return (
    <ScreenWrapper barStyle="light-content" statusBarColor={Colors.secondary}>
      <Container>
        <HeaderWrapper>
          <HeaderLabel>Create Online Store</HeaderLabel>
        </HeaderWrapper>
        <FooterWrapper animation="fadeInUpBig">
          <ScrollView>
            <StyledInput
              keyboardType="twitter"
              label="Store name"
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Your store name"
            />
            <StyledInput
              keyboardType="phone-pad"
              label="Phone number"
              placeholder="Your mobile number"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <StyledInput
              keyboardType="twitter"
              label="Address"
              placeholder="Your store address"
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <BottomActionSheet
              label="Store Type"
              options={options}
              placeholder="Select store type"
              value={category}
              setValue={setCategory}
              fontSize={16}
            />
            <StyledInput
              keyboardType="twitter"
              secureTextEntry={visible}
              label="Password"
              rightIcon={renderRightIcon}
              placeholder="Enter password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <StyledInput
              keyboardType="twitter"
              secureTextEntry={visible}
              label="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <StyledSignUpButton
              loading={isLoading}
              title="Create Store"
              onPress={checkPassword}
            ></StyledSignUpButton>
            <Divider inset={true} insetType="middle" />
            <StyledSignInButton
              title="SignIn"
              type="outline"
              onPress={() => navigation.navigate("login")}
            />
          </ScrollView>
        </FooterWrapper>
      </Container>
    </ScreenWrapper>
  );
};

export default Signup;
