import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Colors } from "../../colors";
import DefaultImage from "../../assets/default.jpg";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Container,
  ItemContainer,
  ItemName,
  ItemSeparatorComponent,
  ItemStatus,
  Price,
  PriceWrappper,
  StyledEntypoIcon,
  TextWrapper,
} from "./styles";
import { ScreenWrapper } from "react-native-screen-wrapper";
import { SearchInput } from "../../components";
import { useGetItemsQuery } from "../../redux/slice/apiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slice/userSlice";

const Item = ({ navigation }) => {
  const user = useSelector(selectUser);
  const itemRef = React.useRef();
  const [search, setSearch] = useState("");
  const { data: items, isLoading, refetch } = useGetItemsQuery(user?.id);
  const [filteredDataSource, setFilteredDataSource] = useState(items);

  useEffect(() => setFilteredDataSource(items), [items]);

  const loadItemsData = () => {
    refetch();
    setFilteredDataSource(items);
  };

  const searchFilterFunction = (text) => {
    setFilteredDataSource(
      items.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
    setSearch(text);
  };

  const ItemView = ({ item }) => {
    return (
      <ItemContainer>
        <Avatar.Image
          source={item.image ? { uri: item.image } : DefaultImage}
          size={40}
        />
        <TextWrapper
          onPress={() => navigation.navigate("Item-Edit", { item: item })}
        >
          <ItemName>{item.name}</ItemName>
          <ItemStatus status={item.status}>
            {item.status ? "Online" : "Offline"}
          </ItemStatus>
        </TextWrapper>
        <PriceWrappper>
          <Price>{`PKR ${item.selling_price}`}</Price>
        </PriceWrappper>
        <TouchableOpacity>
          <StyledEntypoIcon name="dots-three-vertical" size={20} />
        </TouchableOpacity>
      </ItemContainer>
    );
  };

  return (
    <ScreenWrapper barStyle="dark-content" statusBarColor={Colors.white}>
      <Container>
        <SearchInput
          value={search}
          onChange={searchFilterFunction}
          searchRef={itemRef}
          placeholder="Search by Item name"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={ItemView}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={loadItemsData} />
          }
        />
      </Container>
    </ScreenWrapper>
  );
};

export default Item;
