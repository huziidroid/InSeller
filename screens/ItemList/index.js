import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Colors } from "../../colors";
import DefaultImage from "../../assets/default.jpg";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
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

const data = [
  {
    id: 1,
    name: "Item 1",
    status: false,
    selling_price: 100,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
  {
    id: 1,
    name: "Item 1",
    status: true,
    selling_price: 100,
    images: [
      {
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      },
    ],
  },
];

const Item = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);
  const [show, setShow] = useState(true);
  const itemRef = React.useRef();

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadItemsData();
  }, [isFocused]);

  useEffect(() => {
    loadItemsData();
  }, []);

  const loadItemsData = () => {
    setFilteredDataSource(data);
    setMasterDataSource(data);
    setRefreshing(false);
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.itemName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
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
            <RefreshControl refreshing={refreshing} onRefresh={loadItemsData} />
          }
        />
      </Container>
    </ScreenWrapper>
  );
};

export default Item;
