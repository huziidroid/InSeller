import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const OrderItem = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 40,
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
            paddingLeft: 12,
          }}
        >
          <Feather name="image" size={24} color="black" />
        </View>
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <Text>Goldfish Pencil</Text>
          <Text>Qty 1</Text>
        </View>
      </View>
      <Text
        style={{
          marginRight: 40,
          marginTop: 15,
        }}
      >
        Rs. 10
      </Text>
    </View>
  );
};

export default OrderItem;
