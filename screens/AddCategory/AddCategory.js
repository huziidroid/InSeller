import React, { useState } from "react";
import { Colors } from "../../colors";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { validateCategory } from "../../api/middlewares/category.middleware";
import { useAddCategoryMutation } from "../../redux/slice/apiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slice/userSlice";
import { ScreenWrapper } from "react-native-screen-wrapper";
import { Container, InputWrapper, StyledButton } from "./styles";
import { ImageBox } from "../../components";
import { addToast, pickImage } from "../../utils";
import { StyledInput } from "./styles";

function AddCategory() {
  const navigation = useNavigation();
  const [image, setImage] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [AddCategory, { isLoading }] = useAddCategoryMutation();
  const user = useSelector(selectUser);
  const handleImagePicker = () => {
    pickImage()
      .then((res) => {
        setImage({
          uri: res.uri,
          name: "Cateogry.jpg",
          type: "image/jpg",
        });
      })
      .catch((err) => addToast(err.message, true));
  };

  const handleAddCategory = async (name, image) => {
    const { message, status } = validateCategory(name);
    if (status) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("store_id", user.id);
      if (Object.keys(image).length > 0) {
        formData.append("image", image);
      }
      const { data, error } = await AddCategory({
        data: formData,
        token: user.accessToken,
      });
      if (error) {
        addToast(error.data?.message, true);
      } else {
        addToast(data?.message, false);
        navigation.goBack();
      }
    } else {
      addToast(message, true);
    }
  };

  return (
    <ScreenWrapper barStyle="dark-content" statusBarColor={Colors.white}>
      <Container>
        <ScrollView>
          <ImageBox image={image} onPress={handleImagePicker} />
          <InputWrapper>
            <StyledInput
              label="Category name"
              placeholder="Category name"
              value={categoryName}
              onChangeText={(text) => setCategoryName(text)}
            />
            <StyledButton
              loading={isLoading}
              title="Add Category"
              onPress={() => handleAddCategory(categoryName, image)}
            />
          </InputWrapper>
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
}

export default AddCategory;
