import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../colors";
import { Input, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { addCategory } from "../redux/Categories/category.action";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function AddCategory() {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [base64, setBase64] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const store = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      // console.log(result);
      setImage(result.uri);
      setBase64(`data:image/jpg;base64,${result.base64}`);
    }
  };

  // useEffect(() => {
  //   if (categories.isLoading) {
  //     Toast.show("Adding...", {
  //       duration: Toast.durations.SHORT,
  //       position: Toast.positions.BOTTOM,
  //       shadow: true,
  //       animation: true,
  //       hideOnPress: true,
  //       delay: 0,
  //     });
  //   }
  // }, [categories.isLoading]);

  useEffect(() => {
    if (categories.errorMessage.length > 0) {
      Toast.show(categories.errorMessage, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  }, [categories.error]);

  useEffect(() => {
    if (categories.successMessage.length > 0) {
      Toast.show(categories.successMessage, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      navigation.goBack();
    }
  }, [categories.successMessage]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.picture_box} onPress={pickImage}>
          {image === "" ? (
            <>
              <Feather name="camera" size={17} color="black" />
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Poppins_300Light",
                }}
              >
                Add Image
              </Text>
            </>
          ) : (
            <Image
              source={{ uri: image }}
              style={{ width: "95%", height: "95%" }}
            />
          )}
        </TouchableOpacity>

        <View style={styles.input_container}>
          <Input
            label="Category name"
            placeholder="Category name"
            inputStyle={styles.inputStyle}
            containerStyle={styles.textInput}
            labelStyle={styles.textInput_label}
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />

          <Button
            containerStyle={styles.btn_container_style}
            buttonStyle={[styles.button, { backgroundColor: Colors.secondary }]}
            title="Add Category"
            onPress={() => {
              dispatch(
                addCategory(
                  store.user.id,
                  store.token,
                  categoryName,
                  image,
                  base64
                )
              );
              setCategoryName("");
            }}
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
