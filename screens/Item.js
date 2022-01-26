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
import DefaultImage from "../assets/default.jpg";
import { Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Item = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);
  const [show, setShow] = useState(true);
  const data = [
    { itemName: "GoldFish Pencil", price: 10, image: "path", status: true },
    { itemName: "Tibet Soap", price: 10, image: "path", status: false },
    { itemName: "Socks", price: 10, image: "path", status: true },
    { itemName: "Bike", price: 10, image: "path", status: true },
    { itemName: "Bike", price: 10, image: "path", status: true },
    { itemName: "Bike", price: 10, image: "path", status: true },
  ];
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

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
        const itemData = item.itemName
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
      // Flat List Item
      <TouchableOpacity
        style={styles.ItemContainer}
        activeOpacity={0.5}
        onPress={
          show
            ? () => navigation.navigate("Item-Add")
            : () => navigation.getState()
        }
      >
        {<Avatar.Image source={DefaultImage} size={40} />}
        <View style={styles.itemDescription}>
          <Text style={styles.itemNameStyle}>{item.itemName}</Text>

          <Text
            style={{
              color: item.status ? "green" : "gray",
              fontFamily: "Poppins_300Light",
              fontSize: 10,
            }}
          >
            {item.status ? "Online" : "Offline"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.itemPriceStyle}>{`PKR ${item.price}`}</Text>
          <Entypo
            style={{
              marginRight: 10,
            }}
            onPress={() => {
              setShow(false);
              alert("Show");
              setShow(true);
            }}
            name="dots-three-vertical"
            size={20}
            color={Colors.primaryColor}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
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
          placeholder={`${data.length} Items (Search by Item name)`}
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
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadItemsData} />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  ItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: Colors.white,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 5,
    elevation: 3,
  },
  itemDescription: {
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
  itemNameStyle: { fontSize: 16, fontFamily: "Poppins_400Regular" },
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

export default Item;
