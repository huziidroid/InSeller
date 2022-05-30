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
import {
  useGetCategoriesQuery,
  useAddItemMutation,
} from "../../redux/slice/apiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slice/userSlice";
import { getCategoryId } from "../../utils";
import { validateItem } from "../../api/middlewares/item.middleware";
import { CheckBox } from "react-native-elements";

const AddItem = ({ navigation }) => {
  const [unit, setUnit] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(0);
  const [itemImage, setItemImage] = React.useState({});
  const [name, setName] = React.useState("");
  const user = useSelector(selectUser);
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState("0");
  const [sellingPrice, setSellingPrice] = React.useState("0");
  const [costPrice, setCostPrice] = React.useState("0");
  const [discountPrice, setDiscountPrice] = React.useState("0");
  const [isOnline, setIsOnline] = React.useState(false);
  const { data: categories } = useGetCategoriesQuery(user?.id);

  const categoryOption = [];
  categoryOption.push("Add Category");
  categories?.forEach((category) => {
    categoryOption.push(category.name);
  });
  const [AddItem, { isLoading: itemLoader }] = useAddItemMutation();

  const handleImagePick = () => {
    pickImage()
      .then((res) => {
        if (!res.cancelled) {
          setItemImage({
            uri: res.uri,
            name: "Cateogry.jpg",
            type: "image/jpg",
          });
        }
      })
      .catch((err) => addToast(err.message, true));
  };

  const handleSubmit = async (
    name,
    unit,
    categoryId,
    sellingPrice,
    discountPrice,
    costPrice,
    quantity,
    description,
    isOnline
  ) => {
    const { status, message } = validateItem(
      name,
      categoryId,
      description,
      sellingPrice,
      unit
    );
    if (status) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category_id", categoryId);
      formData.append("description", description);
      formData.append("selling_price", sellingPrice);
      formData.append("cost_price", costPrice);
      formData.append("discount_price", discountPrice);
      formData.append("quantity", quantity);
      formData.append("unit", unit);
      formData.append("store_id", user.id);
      formData.append("status", isOnline);
      if (Object.keys(itemImage).length > 0) {
        formData.append("image", itemImage);
      }
      const { data, error } = await AddItem({
        data: formData,
        token: user.accessToken,
      });
      if (error) {
        addToast(error.data?.message, true);
      } else {
        addToast(data.message, false);
        navigation.goBack();
      }
    } else {
      addToast(message, true);
    }
  };
  const onCategorySelect = (category, index) => {
    if (index === 0) {
      navigation.navigate("Category-Add");
    }
    setCategoryId(getCategoryId(categories, category));
  };

  return (
    <ScreenWrapper barStyle="dark-content" statusBarColor={Colors.white}>
      <Container>
        <ScrollView>
          <ImageBox image={itemImage} onPress={handleImagePick} />
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
                data={categoryOption}
                onSelect={onCategorySelect}
              />
            </HorizontalInputWrapper>
            <HorizontalInputWrapper>
              <StyledInput
                keyboardType="numeric"
                label="Sellling Price"
                placeholder="Selling Price"
                value={sellingPrice}
                onChangeText={(text) =>
                  setSellingPrice(
                    text.replace(/^0+/, "").replace(/[^0-9]/g, "")
                  )
                }
              />
              <StyledInput
                keyboardType="numeric"
                value={discountPrice}
                onChangeText={(text) =>
                  setDiscountPrice(
                    text.replace(/^0+/, "").replace(/[^0-9]/g, "")
                  )
                }
                label="Discount Price"
                placeholder="Discount price"
              />
            </HorizontalInputWrapper>
            <HorizontalInputWrapper>
              <StyledInput
                keyboardType="numeric"
                value={costPrice}
                onChangeText={(text) =>
                  setCostPrice(text.replace(/^0+/, "").replace(/[^0-9]/g, ""))
                }
                label="Cost Price"
                placeholder="Cost price"
              />
              <StyledInput
                keyboardType="numeric"
                label="Item Quantity"
                placeholder="Item Quantity"
                value={quantity}
                onChangeText={(text) =>
                  setQuantity(text.replace(/^0+/, "").replace(/[^0-9]/g, ""))
                }
              />
            </HorizontalInputWrapper>
            <StyledInput
              label="Description"
              placeholder="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <CheckBox
              title="List Item Online"
              checked={isOnline}
              checkedColor={Colors.secondary}
              onPress={() => setIsOnline(!isOnline)}
            />
            <ButtonWrapper>
              <StyledButton
                loading={itemLoader}
                title="Add Item"
                onPress={() =>
                  handleSubmit(
                    name,
                    unit,
                    categoryId,
                    parseInt(sellingPrice),
                    parseInt(discountPrice),
                    parseInt(costPrice),
                    parseInt(quantity),
                    description,
                    isOnline
                  )
                }
              />
            </ButtonWrapper>
          </InputWrapper>
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};

export default AddItem;
