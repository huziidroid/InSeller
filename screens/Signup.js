import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, Divider, Input } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { Colors } from "../colors";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-root-toast";
import {
  useGetStoreCategoriesQuery,
  useSignUpMutation,
} from "../redux/slice/apiSlice";
import { authSignUp } from "../api/middlewares/user.middleware";
import { storeLocation } from "../components/user-location";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice/userSlice";

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState(0);
  const [visible, setVisible] = useState(true);
  const [location, setLocation] = useState(null);
  const { data: categories, isSuccess: categorySuccess } =
    useGetStoreCategoriesQuery();
  const [signUp, { isLoading, isError, error, data, isSuccess }] =
    useSignUpMutation();

  const dispatch = useDispatch();
  const handleSignUp = async () => {
    const validation = authSignUp(
      name,
      phone,
      address,
      location,
      category,
      password
    );
    if (validation.status) {
      await signUp({
        name: name,
        phone_number: phone,
        address: address,
        location: location,
        category_id: category,
        password: password,
      });
    } else {
      Toast.show(validation.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  };
  useEffect(() => {
    storeLocation(setLocation);
  }, []);
  useEffect(() => {
    if (isSuccess) {
      Toast.show(data.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      dispatch(setUser(data.user));
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_label}>Create Online Store</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <ScrollView>
          <Input
            keyboardType="twitter"
            style={styles.textInput}
            label="Store name"
            labelStyle={styles.textInput_label}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Your store name"
          />
          <Input
            keyboardType="phone-pad"
            style={styles.textInput}
            label="Phone number"
            labelStyle={styles.textInput_label}
            placeholder="Your mobile number"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <Input
            keyboardType="twitter"
            style={styles.textInput}
            label="Address"
            labelStyle={styles.textInput_label}
            placeholder="Your store address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <Text
            style={[
              styles.textInput_label,
              { marginLeft: 10, fontFamily: "Poppins_700Bold" },
            ]}
          >
            Store Type
          </Text>
          <View
            style={[
              styles.textInput,
              {
                marginTop: 0,
                marginHorizontal: 10,
                marginVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
              },
            ]}
          >
            <Picker
              mode="dropdown"
              placeholder="Select store type"
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
              <Picker.Item label="Select Store Type" value={0} />
              {categorySuccess
                ? categories.categories.map((category, key) => (
                    <Picker.Item
                      key={key}
                      label={category.name}
                      value={category.id}
                    />
                  ))
                : null}
            </Picker>
          </View>

          <Input
            keyboardType="twitter"
            style={styles.textInput}
            secureTextEntry={visible}
            label="Password"
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
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            keyboardType="twitter"
            style={styles.textInput}
            secureTextEntry={visible}
            label="Confirm Password"
            labelStyle={styles.textInput_label}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <Button
            loading={isLoading}
            title="Create Store"
            buttonStyle={styles.button}
            onPress={() => {
              if (password === confirmPassword) {
                handleSignUp();
              } else {
                Toast.show("Password does not match", {
                  duration: Toast.durations.LONG,
                  position: Toast.positions.BOTTOM,
                  shadow: true,
                  animation: true,
                });
              }
            }}
          ></Button>
          <Divider inset={true} insetType="middle" />
          <Button
            title="SignIn"
            type="outline"
            buttonStyle={{
              borderRadius: 10,
              height: 50,
              marginVertical: 15,
              marginHorizontal: 10,
            }}
            onPress={() => {
              navigation.navigate("login");
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
    height: 50,
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 10,
  },
});

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     store_categories: state.store_categories,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     SignUp: (name, phone, address, location, category, password) =>
//       dispatch(SignUp(name, phone, address, location, category, password)),
//     getCategories: () => dispatch(getCategories()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Signup);
export default Signup;
