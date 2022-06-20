import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Colors } from "../../colors";
import {
  Container,
  OrderContainer,
  OrderInfo,
  OrderItemCount,
  OrderNumber,
  OrderPrice,
  SeparatorComponent,
} from "./styles";
import { ScreenWrapper } from "react-native-screen-wrapper";
import { SearchInput } from "../../components";
import { useGetOrdersQuery } from "../../redux/slice/apiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slice/userSlice";

const Order = ({ navigation }) => {
  const itemRef = React.useRef();
  const user = useSelector(selectUser);
  const { data, isLoading, refetch } = useGetOrdersQuery(user?.id);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => setFilteredDataSource(data), [data]);

  const loadOrdersData = () => {
    refetch();
    setFilteredDataSource(data);
  };

  const searchFilterFunction = (text) => {
    setFilteredDataSource(
      data.filter((item) =>
        item.order_no.toLowerCase().includes(text.toLowerCase())
      )
    );
    setSearch(text);
  };

  const OrderDescription = ({ item }) => {
    return (
      <OrderContainer
        activeOpacity={0.5}
        onPress={() => navigation.navigate("OrderDetails", { order: item })}
      >
        <OrderInfo>
          <OrderNumber>{item?.order_no}</OrderNumber>
          <OrderItemCount>Items {item?.items?.length}</OrderItemCount>
        </OrderInfo>
        <OrderPrice>Rs. {item?.amount}</OrderPrice>
      </OrderContainer>
    );
  };

  return (
    <ScreenWrapper barStyle="dark-content" statusBarColor={Colors.white}>
      <Container>
        <SearchInput
          onChange={searchFilterFunction}
          searchRef={itemRef}
          placeholder="Search by Order Number"
          value={search}
        />
      </Container>
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={SeparatorComponent}
        renderItem={OrderDescription}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadOrdersData} />
        }
      />
    </ScreenWrapper>
  );
};

export default Order;
