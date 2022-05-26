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
import { useGetCategoriesQuery } from "../redux/slice/apiSlice";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slice/userSlice";

const Category = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(true);
  const searchRef = React.useRef();
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const user = useSelector(selectUser);
  const {
    data: categories,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery(user.id);

  useEffect(() => {
    if (isSuccess) {
      loadCategoriesData();
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  const loadCategoriesData = () => {
    setFilteredDataSource(categories.categories);
    setMasterDataSource(categories.categories);
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter((category) => {
        const categoryName = category.name
          ? category.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return categoryName.indexOf(textData) > -1;
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

  const CategoryView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity
        style={styles.categoryContainer}
        activeOpacity={0.5}
        onPress={
          show
            ? () => navigation.navigate("Category-Edit", { category: item })
            : () => navigation.getState()
        }
      >
        {
          <Avatar.Image
            source={item.image.length > 0 ? { uri: item.image } : DefaultImage}
            size={40}
          />
        }
        <View style={styles.categoryDescription}>
          <Text style={styles.categoryNameStyle}>{item.name}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
            color={Colors.secondary}
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
    <View
      style={{
        flex: 1,
        marginBottom: 80,
      }}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          ref={searchRef}
          underlineColorAndroid="transparent"
          placeholder={"Search by category name"}
        />
        <TouchableOpacity onPress={() => searchRef.current.focus()}>
          <Feather
            style={styles.iconStyle}
            name="search"
            size={20}
            color={Colors.secondary}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={CategoryView}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadCategoriesData}
          />
        }
      />
    </View>
  );
};

export default Category;
const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: Colors.white,
    paddingLeft: 10,
    paddingVertical: 5,
    borderRadius: 5,
    elevation: 5,
  },
  categoryDescription: {
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
  categoryNameStyle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: Colors.textColor,
  },

  iconStyle: {
    marginRight: 30,
  },
  textInputStyle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    flex: 1,
    height: 50,
    paddingLeft: 20,
    margin: 5,
    borderRadius: 10,
    color: Colors.textColor,
    backgroundColor: Colors.white,
  },
});
