import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Colors } from "../../colors";
import DefaultImage from "../../assets/default.jpg";
import { Avatar } from "react-native-paper";
import { useGetCategoriesQuery } from "../../redux/slice/apiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slice/userSlice";
import {
  CategoryName,
  CategoryWrapper,
  DescriptionWrapper,
  IconWrapper,
  ItemSeparatorComponent,
  StyledEntypoIcon,
} from "./styles";
import { ScreenWrapper } from "react-native-screen-wrapper";
import { SearchInput } from "../../components";

const Category = ({ navigation }) => {
  const user = useSelector(selectUser);
  const {
    data: categories,
    isLoading,
    refetch,
  } = useGetCategoriesQuery(user?.id);
  const searchRef = React.useRef();
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(categories);

  useEffect(() => setFilteredDataSource(categories), [categories]);

  const loadCategoriesData = () => {
    refetch();
    setFilteredDataSource(categories);
  };

  const searchFilterFunction = (text) => {
    setFilteredDataSource(
      categories.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
    setSearch(text);
  };

  const CategoryItemView = ({ item }) => {
    return (
      <CategoryWrapper>
        <Avatar.Image
          source={item.image ? { uri: item.image } : DefaultImage}
          size={40}
        />
        <DescriptionWrapper
          onPress={() =>
            navigation.navigate("Category-Edit", { category: item })
          }
        >
          <CategoryName>{item.name}</CategoryName>
        </DescriptionWrapper>
        <IconWrapper>
          <StyledEntypoIcon name="dots-three-vertical" size={20} />
        </IconWrapper>
      </CategoryWrapper>
    );
  };

  return (
    <ScreenWrapper barStyle="dark-content" statusBarColor={Colors.white}>
      <SearchInput
        searchRef={searchRef}
        onChange={searchFilterFunction}
        placeholder="Search by category name"
        value={search}
      />
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={CategoryItemView}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadCategoriesData}
          />
        }
      />
    </ScreenWrapper>
  );
};

export default Category;
