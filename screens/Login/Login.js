import React, { useState, useRef } from "react";
import { View, Text, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PhoneInput from "react-native-phone-number-input";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { sendSmsVerification } from "../../api/verify";

const Login = () => {
  const dialCall = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:03312220373`;
    } else {
      phoneNumber = `telprompt:03312220373`;
    }
    Linking.openURL(phoneNumber);
  };

  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          minHeight: 100,
          paddingLeft: 20,
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          What's your Mobile number?
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          We will send you a verification code
        </Text>
      </View>

      {/* Phone Number */}
      <View
        style={{
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 170,
          left: 40,
          right: 40,
        }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            marginBottom: 20,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Mobile Number
        </Text>
        <PhoneInput
          defaultCode="PK"
          containerStyle={{
            borderRadius: 10,
          }}
          textContainerStyle={{
            borderRadius: 10,
          }}
          ref={phoneInput}
          defaultValue={value}
          layout="first"
          placeholder="Mobile Number"
          onChangeText={(text) => {
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          countryPickerProps={{ withAlphaFilter: true }}
          withShadow
          autoFocus
        />

        {!valid && value.length > 0 && value.length < 10 && (
          <View>
            <Text
              style={{
                color: "red",
              }}
            >
              Mobile Number entered is not valid
            </Text>
            <Text
              style={{
                color: "red",
              }}
            >
              Format: 3xx1234567
            </Text>
          </View>
        )}
      </View>

      <View
        style={{
          height: 100,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingBottom: 20,
          paddingTop: 50,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
          }}
          onPress={dialCall}
        >
          <Text
            style={{
              marginLeft: 20,
              marginRight: 10,
              fontSize: 15,
              fontWeight: "600",
              color: "gray",
            }}
          >
            Any Trouble? Call Us
          </Text>
          <Ionicons name="call-outline" size={20} color="black" />
        </TouchableOpacity>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            height: 50,
            flex: 0.5,
            justifyContent: "center",
            alignContent: "center",
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setValid(checkValid ? checkValid : false);
              if (checkValid) {
                // sendSmsVerification(formattedValue).then((sent) => {
                //   navigation.navigate("OTP Verification", { formattedValue });
                // });
                navigation.navigate("OTP Verification", { formattedValue });
              }
            }}
            // onPress={() => }
          >
            <Ionicons name="md-checkmark-done-circle" size={24} color="black" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
