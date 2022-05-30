import React, { useEffect } from "react";
import { Colors } from "../../colors";
import { CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { DropDownSelect, ImageBox } from "../../components";
import {
  ButtonWrapper,
  Container,
  HorizontalInputWrapper,
  InputWrapper,
  StyledButton,
  StyledInput,
} from "./styles";
import { options } from "../../constants/Unit";
import { selectUser } from "../../redux/slice/userSlice";
import { useSelector } from "react-redux";
import {
  useGetCategoriesQuery,
  useEditItemMutation,
  useDeleteItemMutation,
} from "../../redux/slice/apiSlice";
import { addToast, getCategoryId, pickImage } from "../../utils";
import { validateItem } from "../../api/middlewares/item.middleware";

const EditItem = ({ navigation, route }) => {
  const item = route.params?.item;
  const user = useSelector(selectUser);
  const [unit, setUnit] = React.useState(item.unit);
  const [categoryId, setCategoryId] = React.useState(item.category_id);
  const [itemImage, setItemImage] = React.useState({});
  const [name, setName] = React.useState(item.name);
  const [description, setDescription] = React.useState(item.description);
  const [quantity, setQuantity] = React.useState(item.quantity.toString());
  const [sellingPrice, setSellingPrice] = React.useState(
    item.selling_price.toString()
  );
  const [costPrice, setCostPrice] = React.useState(item.cost_price.toString());
  const [discountPrice, setDiscountPrice] = React.useState(
    item.discount_price.toString()
  );
  const [isOnline, setIsOnline] = React.useState(item.status);
  const [disable, setDisable] = React.useState(true);
  const { data: categories } = useGetCategoriesQuery(user?.id);

  const [EditItem, { isLoading: editLoader }] = useEditItemMutation();
  const [DeleteItem, { isLoading: deleteLoader }] = useDeleteItemMutation();
  const [isImageSelected, setIsImageSelected] = React.useState(false);

  const categoryOption = [];
  categoryOption.push("Add Category");
  categories?.forEach((category) => {
    categoryOption.push(category.name);
  });

  const handleImagePick = () => {
    pickImage()
      .then((res) => {
        if (!res.cancelled) {
          setItemImage({
            uri: res.uri,
            name: "Cateogry.jpg",
            type: "image/jpg",
          });
          setIsImageSelected(true);
        }
      })
      .catch((err) => addToast(err.message, true));
  };

  const onCategorySelect = (category, index) => {
    if (index === 0) {
      navigation.navigate("Category-Add");
    }
    setCategoryId(getCategoryId(categories, category));
    isDataUpdateCallbacks();
  };

  const handleUpdateClick = async () => {
    const { status, message } = validateItem(
      name,
      categoryId,
      description,
      sellingPrice,
      unit
    );
    if (status) {
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("name", name);
      formData.append("category_id", categoryId);
      formData.append("description", description);
      formData.append("selling_price", sellingPrice);
      formData.append("cost_price", costPrice);
      formData.append("discount_price", discountPrice);
      formData.append("quantity", quantity);
      formData.append("unit", unit);
      formData.append("status", isOnline);
      formData.append("store_id", user.id);
      if (isImageSelected) {
        formData.append("image", itemImage);
      }
      const { data, error } = await EditItem({
        data: formData,
        token: user.accessToken,
      });
      if (error) {
        addToast("Error occured while updaing, please restart app", true);
      } else {
        addToast(data.message, false);
        navigation.goBack();
      }
    } else {
      addToast(message, true);
    }
  };
  const handleDeleteClick = async () => {
    const { data, error } = await DeleteItem({
      id: item.id,
      token: user.accessToken,
    });
    if (error) {
      console.log(error);
      addToast("Error occured while deleting, please restart app", true);
    } else {
      addToast(data.message, false);
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (item.image) {
      setItemImage({
        uri: item.image,
        name: "Item.jpg",
        type: "image/jpg",
      });
    }
  }, []);

  const isDataUpdateCallbacks = () => {
    if (
      name !== item.name ||
      unit !== item.unit ||
      categoryId !== item.category_id ||
      sellingPrice !== item.selling_price ||
      discountPrice !== item.discount_price ||
      costPrice !== item.cost_price ||
      quantity !== item.quantity ||
      description !== item.description ||
      isOnline !== item.status
    ) {
      setDisable(false);
    }
    setDisable(true);
  };

  return (
    <Container>
      <ScrollView>
        <ImageBox image={itemImage} onPress={handleImagePick} />
        <InputWrapper>
          <StyledInput
            label="Item Name"
            placeholder="Item Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              isDataUpdateCallbacks();
            }}
          />
          <HorizontalInputWrapper>
            <DropDownSelect
              label="Unit"
              placeholder="Select Item Unit"
              data={options}
              defaultValue={unit}
              onSelect={(selectedItem, index) => {
                setUnit(selectedItem);
                isDataUpdateCallbacks();
              }}
            />
            <DropDownSelect
              label="Category"
              placeholder="Select a Category"
              data={categoryOption}
              defaultValue={
                categories?.find((category) => category.id === item.category_id)
                  ?.name
              }
              onSelect={onCategorySelect}
            />
          </HorizontalInputWrapper>

          <HorizontalInputWrapper>
            <StyledInput
              keyboardType="numeric"
              label="Sellling Price"
              placeholder="Selling Price"
              value={sellingPrice}
              onChangeText={(text) => {
                setSellingPrice(text.replace(/^0+/, "").replace(/[^0-9]/g, ""));
                isDataUpdateCallbacks();
              }}
            />
            <StyledInput
              keyboardType="numeric"
              value={discountPrice}
              onChangeText={(text) => {
                setDiscountPrice(
                  text.replace(/^0+/, "").replace(/[^0-9]/g, "")
                );
                isDataUpdateCallbacks();
              }}
              label="Discount Price"
              placeholder="Discount price"
            />
          </HorizontalInputWrapper>
          <HorizontalInputWrapper>
            <StyledInput
              keyboardType="numeric"
              value={costPrice}
              onChangeText={(text) => {
                setCostPrice(text.replace(/^0+/, "").replace(/[^0-9]/g, ""));
                isDataUpdateCallbacks();
              }}
              label="Cost Price"
              placeholder="Cost price"
            />
            <StyledInput
              keyboardType="numeric"
              label="Item Quantity"
              placeholder="Item Quantity"
              value={quantity}
              onChangeText={(text) => {
                setQuantity(text.replace(/^0+/, "").replace(/[^0-9]/g, ""));
                isDataUpdateCallbacks();
              }}
            />
          </HorizontalInputWrapper>
          <StyledInput
            label="Description"
            placeholder="Description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              isDataUpdateCallbacks();
            }}
          />
          <CheckBox
            title="List Item Online"
            checked={isOnline}
            checkedColor={Colors.secondary}
            onPress={() => {
              setIsOnline(!isOnline);
              isDataUpdateCallbacks();
            }}
          />
          <ButtonWrapper>
            <StyledButton
              loading={deleteLoader}
              isDanger={true}
              type="outline"
              title="Delete"
              onPress={handleDeleteClick}
            />
            <StyledButton
              // disabled={disable}
              loading={editLoader}
              isDanger={false}
              title="Update"
              onPress={handleUpdateClick}
            />
          </ButtonWrapper>
        </InputWrapper>
      </ScrollView>
    </Container>
  );
};

export default EditItem;
