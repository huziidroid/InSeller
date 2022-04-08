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

const EditItem = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView horizontal={true} style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity style={styles.picture_box}>
            <Feather name="camera" size={15} color="black" />
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Poppins_300Light",
              }}
            >
              Add Image
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.input_container}>
          <Input
            label="Item Name"
            placeholder="Item Name"
            inputStyle={styles.inputStyle}
            containerStyle={styles.textInput}
            labelStyle={styles.textInput_label}
          />
          <Input
            label="Item Category"
            placeholder="Category Name"
            inputStyle={styles.inputStyle}
            containerStyle={styles.textInput}
            labelStyle={styles.textInput_label}
          />
          <Input
            label="Selling Price"
            placeholder="Selling Price"
            inputStyle={styles.inputStyle}
            containerStyle={styles.textInput}
            labelStyle={styles.textInput_label}
          />
          <View style={styles.input_sub_container}>
            <Input
              label="Select item unit"
              placeholder="Unit"
              inputStyle={styles.inputStyle}
              containerStyle={styles.textInput}
              labelStyle={styles.textInput_label}
            />
            <Input
              label="Discount Price"
              placeholder="Discount price"
              inputStyle={styles.inputStyle}
              containerStyle={styles.textInput}
              labelStyle={styles.textInput_label}
            />
          </View>
          <View style={styles.input_sub_container}>
            <Input
              label="Select item unit"
              placeholder="Unit"
              inputStyle={styles.inputStyle}
              containerStyle={styles.textInput}
              labelStyle={styles.textInput_label}
            />
            <Input
              label="Discount Price"
              placeholder="Discount price"
              inputStyle={styles.inputStyle}
              containerStyle={styles.textInput}
              labelStyle={styles.textInput_label}
            />
          </View>
          <View style={styles.button_container}>
            <Button
              containerStyle={styles.btn_container_style}
              buttonStyle={[styles.button, { borderColor: Colors.textDanger }]}
              type="outline"
              title="Delete"
              titleStyle={{ color: Colors.textDanger }}
            />
            <Button
              containerStyle={styles.btn_container_style}
              buttonStyle={[
                styles.button,
                { backgroundColor: Colors.secondary },
              ]}
              title="Update"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  button_container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  picture_box: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
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
    fontSize: 12,
    color: Colors.textColor,
    fontFamily: "Poppins_300Light",
  },
  inputStyle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    height: 50,
    width: 150,
  },
  btn_container_style: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
});
