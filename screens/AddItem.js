import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../colors";
import { Input, Button } from "react-native-elements";
import { options } from "../api/constants/Unit";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { addItem } from "../redux/Items/item.action";
import Toast from "react-native-root-toast";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddItem = () => {
  const categories = useSelector((state) => state.categories);
  const store = useSelector((state) => state.user);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [unit, setUnit] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [CategoryId, setCategoryId] = React.useState(0);
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();
  const [images, setImages] = React.useState([]);
  const [base64, setBase64] = React.useState([]);
  const categoryOptions = [
    "Add New Category",
    ...categories.categories.map((category) => category.name),
  ];
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [sellingPrice, setSellingPrice] = React.useState("");
  const [costPrice, setCostPrice] = React.useState("");
  const [discountPrice, setDiscountPrice] = React.useState("");

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
      setImages([...images, result.uri]);
      setBase64([...base64, `data:image/jpg;base64,${result.base64}`]);
    }
  };

  useEffect(() => {
    if (items.error) {
      Toast.show(items.errorMessage, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  }, [items.error]);

  useEffect(() => {
    if (items.successMessage.length > 0) {
      Toast.show(items.successMessage, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      navigation.goBack();
    }
  }, [items.successMessage]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView horizontal={true} style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            style={styles.picture_box}
            onPress={() => {
              images.length < 4
                ? pickImage()
                : alert("You can select only 4 images");
            }}
          >
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
          {images.map((image, index) => (
            <View key={index} style={styles.picture_box}>
              <Image
                source={{ uri: image }}
                style={{ width: "95%", height: "95%" }}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.input_container}>
          <Input
            label="Item Name"
            placeholder="Item Name"
            value={name}
            onChangeText={(text) => setName(text)}
            inputStyle={styles.inputStyle}
            containerStyle={styles.textInput}
            labelStyle={styles.textInput_label}
          />
          <TouchableOpacity
            style={styles.bottom_sheet}
            onPress={() => {
              showActionSheetWithOptions(
                {
                  options: categoryOptions,
                  containerStyle: {
                    width: windowWidth,
                    height: windowHeight - 300,
                  },
                  cancelButtonIndex: 0,
                  title: "Item category",
                },
                (buttonIndex) => {
                  if (buttonIndex === 0) {
                    navigation.navigate("Category-Add");
                  } else {
                    setCategory(categoryOptions[buttonIndex]);
                    setCategoryId(
                      categories.categories.find(
                        (category) =>
                          category.name === categoryOptions[buttonIndex]
                      ).id
                    );
                  }
                }
              );
            }}
          >
            <Input
              value={category}
              disabled
              showSoftInputOnFocus={false}
              pointerEvents="none"
              label="Item Category"
              placeholder="Category Name"
              inputStyle={styles.inputStyle}
              containerStyle={styles.textInput}
              labelStyle={styles.textInput_label}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              showActionSheetWithOptions(
                {
                  options: options,
                  containerStyle: {
                    width: windowWidth,
                    height: windowHeight - 300,
                  },
                  cancelButtonIndex: 0,
                  title: "Select Unit",
                },
                (buttonIndex) => {
                  setUnit(options[buttonIndex]);
                }
              );
            }}
            style={styles.bottom_sheet}
          >
            <Input
              value={unit}
              disabled
              showSoftInputOnFocus={false}
              pointerEvents="none"
              label="Select item unit"
              placeholder="Unit"
              inputStyle={styles.inputStyle}
              containerStyle={styles.textInput}
              labelStyle={styles.textInput_label}
            />
          </TouchableOpacity>

          <Input
            label="Description"
            placeholder="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            inputStyle={styles.inputStyle}
            containerStyle={styles.textInput}
            labelStyle={styles.textInput_label}
          />

          <View style={styles.input_sub_container}>
            <Input
              keyboardType="numeric"
              label="Sellling Price"
              placeholder="Selling Price"
              value={sellingPrice}
              onChangeText={(text) => parseInt(setSellingPrice(text))}
              inputStyle={styles.inputStyle}
              containerStyle={styles.textInput}
              labelStyle={styles.textInput_label}
            />
            <Input
              keyboardType="numeric"
              value={discountPrice}
              onChangeText={(text) => parseInt(setDiscountPrice(text))}
              label="Discount Price"
              placeholder="Discount price"
              inputStyle={styles.inputStyle}
              containerStyle={styles.textInput}
              labelStyle={styles.textInput_label}
            />
          </View>
          <View style={styles.input_sub_container}>
            <Input
              keyboardType="numeric"
              value={costPrice}
              onChangeText={(text) => parseInt(setCostPrice(text))}
              label="Cost Price"
              placeholder="Cost price"
              inputStyle={styles.inputStyle}
              containerStyle={styles.textInput}
              labelStyle={styles.textInput_label}
            />

            <Input
              keyboardType="numeric"
              label="Item Quantity"
              placeholder="Item Quantity"
              value={quantity}
              onChangeText={(text) => parseInt(setQuantity(text))}
              inputStyle={styles.inputStyle}
              containerStyle={styles.textInput}
              labelStyle={styles.textInput_label}
            />
          </View>
          <View style={styles.button_container}>
            <Button
              containerStyle={styles.btn_container_style}
              buttonStyle={[
                styles.button,
                { backgroundColor: Colors.secondary },
              ]}
              title="Add Item"
              onPress={() => {
                dispatch(
                  addItem(
                    name,
                    CategoryId,
                    description,
                    unit,
                    sellingPrice,
                    discountPrice,
                    costPrice,
                    quantity,
                    store.user.id,
                    store.token,
                    images,
                    base64
                  )
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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
    marginHorizontal: 30,
  },
  bottom_sheet: {
    width: "100%",
  },
});

export default AddItem;
