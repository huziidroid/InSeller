import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

const OrderItem = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: 20,
        marginVertical: 20,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderWidth: 1.5,
            borderRadius: 50 / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item?.item?.image !== null ? (
            <Avatar.Image source={{ uri: item?.item?.image }} size={50} />
          ) : (
            <Feather name="image" size={24} color="black" />
          )}
        </View>
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <Text>{item?.item?.name}</Text>
          <Text>{`Qty. ${item?.quantity}`}</Text>
        </View>
      </View>
      <Text
        style={{
          marginRight: 40,
          marginTop: 15,
        }}
      >
        {`Rs. ${item?.item?.selling_price}`}
      </Text>
    </View>
  );
};

export default OrderItem;
