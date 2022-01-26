import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  RefreshControl,
} from "react-native";
import { Colors } from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
const Order = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);

  const data = [
    { orderNumber: "101-0002347", itemCount: 10, price: 10 },
    { orderNumber: "101-0001234", itemCount: 10, price: 10 },
    { orderNumber: "101-0003243", itemCount: 10, price: 10 },
    { orderNumber: "101-0004244", itemCount: 10, price: 10 },
    { orderNumber: "101-0005733", itemCount: 10, price: 10 },
    { orderNumber: "101-0005443", itemCount: 10, price: 10 },
  ];
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    loadOrdersData();
  }, []);
  const loadOrdersData = () => {
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
        const itemData = item.orderNumber
          ? item.orderNumber.toUpperCase()
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

  const OrderDescription = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity
        style={styles.orderContainer}
        activeOpacity={0.5}
        onPress={() => navigation.navigate("OrderDetails")}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text>Order # {item.orderNumber}</Text>
          <Text>Items {item.itemCount}</Text>
        </View>
        <Text>Rs. {item.price}</Text>
      </TouchableOpacity>
    );
  };

  const OrderSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 10,
          width: "100%",
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder={`${data.length} Orders (Search by Order Number)`}
        />
        <Feather
          style={styles.iconStyle}
          name="search"
          size={20}
          color={Colors.primaryColor}
        />
      </View>
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={OrderSeparatorView}
        renderItem={OrderDescription}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadOrdersData} />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  orderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    height: 50,
    elevation: 3,
  },
  orderDescription: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 20,
  },
  container: {
    borderTopWidth: 0.5,
    borderTopColor: "lightgray",
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgray",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  orderNumberStyle: { fontSize: 16, fontFamily: "Poppins_400Regular" },
  itemPriceStyle: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "gray",
    marginRight: 10,
  },

  iconStyle: {
    marginRight: 30,
  },
  textInputStyle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    flex: 1,
    height: 50,
    paddingLeft: 20,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default Order;
