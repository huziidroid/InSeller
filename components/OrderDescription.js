import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const OrderDescription = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        marginTop: 10,
        backgroundColor: "#FFFFFF",
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 10,
        height: 50,
        elevation: 3,
      }}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("OrderDetails")}
    >
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text>Order # {props.orderNumber}</Text>
        <Text>Item {props.itemCount}</Text>
      </View>
      <Text>Rs. {props.orderAmount}</Text>
    </TouchableOpacity>
  );
};
export default OrderDescription;
