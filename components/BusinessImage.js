import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../colors";
import DefaultImage from "../assets/default.jpg";

const BusinessImage = () => {
  const [image, setImage] = useState(null);
  const [selectImage, setSelectImage] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setSelectImage(true);
    }
  };
  return (
    <View style={styles.container}>
      {<Avatar.Image source={selectImage ? { uri: image } : DefaultImage} />}
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.imageText}>Add your Shop Logo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
    paddingLeft: 30,
    marginTop: 30,
  },
  imageText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    textDecorationLine: "underline",
    color: Colors.blue,
    paddingLeft: 30,
  },
});

export default BusinessImage;
