import React, { useEffect, useState } from "react";
import { Colors } from "../../colors";
import { ScrollView } from "react-native-gesture-handler";
import { selectUser } from "../../redux/slice/userSlice";
import { useSelector } from "react-redux";
import { validateCategory } from "../../api/middlewares/category.middleware";
import {
  ButtonWrapper,
  Container,
  InputWrapper,
  StyledButton,
  StyledInput,
} from "./styles";
import { ScreenWrapper } from "react-native-screen-wrapper";
import { pickImage, addToast } from "../../utils";
import {
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/slice/apiSlice";
import { ImageBox } from "../../components";

const Editcategory = ({ route, navigation }) => {
  const { category } = route.params;
  const [categoryName, setCategoryName] = useState(category.name);
  const [image, setImage] = useState({});
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [IsCategoryNameChanged, setIsCategoryNameChanged] = useState(false);
  const [isEditDisable, setIsEditDisable] = useState(true);
  const [EditCategory, { isLoading: editLoader }] = useEditCategoryMutation();
  const [DeleteCategory, { isLoading: deleteLoader }] =
    useDeleteCategoryMutation();
  const user = useSelector(selectUser);

  const handleImagePicker = () => {
    pickImage()
      .then((res) => {
        setImage({
          uri: res.uri,
          name: "Cateogry.jpg",
          type: "image/jpg",
        });
        setIsImageSelected(true);
      })
      .catch((err) => addToast(err.message, true));
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
      const { data, error } = await EditCategory({
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
      addToast(validate.message, true);
    }
  };

  const handleDeleteCategory = async () => {
    const { data, error } = await DeleteCategory({
      id: category.id,
      token: user.accessToken,
    });
    if (error) {
      addToast(error.data?.message, true);
    } else {
      addToast(data?.message, false);
      navigation.goBack();
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
    <ScreenWrapper barStyle="dark-content" statusBarColor={Colors.white}>
      <Container>
        <ScrollView>
          <ImageBox image={image} onPress={handleImagePicker} />
          <InputWrapper>
            <StyledInput
              label="Category name"
              placeholder="Category name"
              value={categoryName}
              onChangeText={handleCategoryNameChange}
            />
            <ButtonWrapper>
              <StyledButton
                loading={deleteLoader}
                type="outline"
                title="Delete"
                isDanger={true}
                onPress={handleDeleteCategory}
              />
              <StyledButton
                disabled={isEditDisable}
                title="Edit Category"
                loading={editLoader}
                onPress={() => handleEditCategory(categoryName, image)}
              />
            </ButtonWrapper>
          </InputWrapper>
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};

export default Editcategory;
