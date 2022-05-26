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
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { validateCategory } from "../api/middlewares/category.middleware";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Editcategory = ({ route }) => {
  const { category } = route.params;
  const [categoryName, setCategoryName] = useState(category.name);
  const [image, setImage] = useState({});
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [IsCategoryNameChanged, setIsCategoryNameChanged] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
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
      setImage({
        uri: result.uri,
        name: "Cateogry.jpg",
        type: "image/jpg",
      });
      setIsImageSelected(true);
    }
  };
  const handleCategoryNameChange = (text) => {
    setCategoryName(text);
    setIsCategoryNameChanged(true);
    if (text === category.name) {
      setIsCategoryNameChanged(false);
    }
  };
  const handleEditCategory = async (name, image) => {
    const validate = validateCategory(name);
    if (validate.status) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("id", category.id);
      if (isImageSelected) {
        formData.append("image", image);
      }
      // await AddCategory({ data: formData, token: user.accessToken });
      
    } else {
      Toast.show(validate.message);
    }
  };

  useEffect(() => {
    if (category.image) {
      setImage({
        uri: category.image,
        name: "Cateogry.jpg",
        type: "image/jpg",
      });
    }
  }, []);
  useEffect(() => {
    if (IsCategoryNameChanged || isImageSelected) {
      setIsEditDisable(false);
    } else {
      setIsEditDisable(true);
    }
  }, [isImageSelected, IsCategoryNameChanged]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.picture_box} onPress={pickImage}>
          {Object.keys(image).length === 0 ? (
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
              source={{ uri: image.uri }}
              style={{ width: "95%", height: "95%" }}
            />
          )}
        </TouchableOpacity>
        <View style={styles.input_container}>
          <Input
            label="Category name"
            placeholder="Category name"
            value={categoryName}
            onChangeText={handleCategoryNameChange}
            inputStyle={styles.inputStyle}
            containerStyle={styles.textInput}
            labelStyle={styles.textInput_label}
          />
          <View style={styles.button_container}>
            <Button
              containerStyle={styles.btn_container_style}
              buttonStyle={[styles.button, { borderColor: Colors.textDanger }]}
              type="outline"
              title="Delete"
              titleStyle={{ color: Colors.textDanger }}
            />
            <Button
              disabled={isEditDisable}
              containerStyle={styles.btn_container_style}
              buttonStyle={[
                styles.button,
                { backgroundColor: Colors.secondary },
              ]}
              title="Edit Category"
              onPress={() => handleEditCategory(categoryName, image)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Editcategory;

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
    marginHorizontal: 20,
  },
  button_container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});
