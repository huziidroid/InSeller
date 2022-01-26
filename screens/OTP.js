import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, Button } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";

const OTP = ({ route }) => {
  const number = route.params;
  const navigation = useNavigation();
  const [invalidCode, setInvalidCode] = useState(false);
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.prompt}>Enter the code we sent you</Text>
      <Text style={styles.message}>
        {`Your phone (${number.formattedValue}) will be used to protect your account each time you log in.`}
      </Text>
      <Button title="Edit Phone Number" onPress={() => navigation.goBack()} />
      <OTPInputView
        style={{ width: "80%", height: 200 }}
        pinCount={4}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        // onCodeFilled={(code) => {
        //   checkVerification(phoneNumber, code).then((success) => {
        //     if (!success) setInvalidCode(true);
        //     success && navigation.replace("Gated");
        //   });
        // }}
      />
      {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
      <Button
        onPress={() => navigation.navigate("Tab")}
        title="Go Home"
      ></Button>
    </SafeAreaView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },

  error: {
    color: "red",
  },
});
