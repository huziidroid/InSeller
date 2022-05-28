import React from "react";
import { ScrollView } from "react-native";
import { Colors } from "../../colors";
import { ScreenWrapper } from "react-native-screen-wrapper";
import {
  ButtonWrapper,
  Container,
  HorizontalInputWrapper,
  InputWrapper,
  StyledButton,
  StyledInput,
} from "./styles";
import { DropDownSelect, ImageBox } from "../../components";
import { addToast, pickImage } from "../../utils";
import { options } from "../../constants/Unit";

const AddItem = ({ navigation }) => {
  const [unit, setUnit] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(0);
  const [image, setImage] = React.useState({});
  const [name, setName] = React.useState("");

  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [sellingPrice, setSellingPrice] = React.useState("");
  const [costPrice, setCostPrice] = React.useState("");
  const [discountPrice, setDiscountPrice] = React.useState("");
  const handleImagePick = () => {
    pickImage()
      .then((res) =>
        setImage({
          uri: res.uri,
          name: "Cateogry.jpg",
          type: "image/jpg",
        })
      )
      .catch((err) => addToast(err.message, true));
  };

  const handleSubmit = () => {};

  return (
    <ScreenWrapper barStyle="dark-content" statusBarColor={Colors.white}>
      <Container>
        <ScrollView>
          <ImageBox image={image} onPress={handleImagePick} />
          <InputWrapper>
            <StyledInput
              label="Item Name"
              placeholder="Item Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <HorizontalInputWrapper>
              <DropDownSelect
                label="Unit"
                placeholder="Select Item Unit"
                data={options}
                onSelect={(selectedItem, index) => setUnit(selectedItem)}
              />
              <DropDownSelect
                label="Category"
                placeholder="Select a Category"
                data={[
                  "Add Category",
                  "Egypt",
                  "Canada",
                  "Australia",
                  "Ireland",
                ]}
                onSelect={(selectedItem, index) => {
                  if (index === 0) {
                    navigation.navigate("Category-Add");
                  } else {
                    setCategoryId(index);
                  }
                }}
              />
            </HorizontalInputWrapper>
            <HorizontalInputWrapper>
              <StyledInput
                keyboardType="numeric"
                label="Sellling Price"
                placeholder="Selling Price"
                value={sellingPrice}
                onChangeText={(text) => parseInt(setSellingPrice(text))}
              />
              <StyledInput
                keyboardType="numeric"
                value={discountPrice}
                onChangeText={(text) => parseInt(setDiscountPrice(text))}
                label="Discount Price"
                placeholder="Discount price"
              />
            </HorizontalInputWrapper>
            <HorizontalInputWrapper>
              <StyledInput
                keyboardType="numeric"
                value={costPrice}
                onChangeText={(text) => parseInt(setCostPrice(text))}
                label="Cost Price"
                placeholder="Cost price"
              />
              <StyledInput
                keyboardType="numeric"
                label="Item Quantity"
                placeholder="Item Quantity"
                value={quantity}
                onChangeText={(text) => parseInt(setQuantity(text))}
              />
            </HorizontalInputWrapper>
            <StyledInput
              label="Description"
              placeholder="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <ButtonWrapper>
              <StyledButton title="Add Item" onPress={handleSubmit} />
            </ButtonWrapper>
          </InputWrapper>
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};

export default AddItem;
