import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../colors";
import { Input, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function AddCategory() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.picture_box}>
          <Feather name="camera" size={17} color="black" />
          <Text
            style={{
              fontSize: 11,
              fontFamily: "Poppins_300Light",
            }}
          >
            Add Image
          </Text>
        </TouchableOpacity>
        <View style={styles.input_container}>
          <Input
            label="Category name"
            placeholder="Category name"
            inputStyle={styles.inputStyle}
            containerStyle={styles.textInput}
            labelStyle={styles.textInput_label}
          />

          <Button
            containerStyle={styles.btn_container_style}
            buttonStyle={[styles.button, { backgroundColor: Colors.secondary }]}
            title="Add Category"
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 60,
  },
  picture_box: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 90,
    width: 90,
    borderRadius: 5,
    borderWidth: 0.5,
    margin: 5,
  },
  input_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input_sub_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    maxWidth: "50%",
  },
  textInput: {
    height: 50,
    marginVertical: 15,
  },
  textInput_label: {
    fontSize: 13,
    color: Colors.textColor,
    fontFamily: "Poppins_300Light",
  },
  inputStyle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    height: 50,
    width: 150,
  },
  btn_container_style: {
    marginVertical: 80,
    marginHorizontal: 30,
  },
});
