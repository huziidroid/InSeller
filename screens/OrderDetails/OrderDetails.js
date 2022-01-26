import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../colors";
import OrderItem from "./components/OrderItem";

const OrderDetails = ({ route }) => {
  return (
    // main__container
    <View style={styles.container}>
      {/* Order Item Details */}
      <View style={styles.styleOrderItem}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <View style={{ marginLeft: 20, marginTop: 10 }}>
            <Text style={styles.orderNumber}>Order # 101-31113313</Text>
            <Text style={styles.orderDate}>25 Sep 2021</Text>
          </View>
          <Text style={styles.orderStatus}>Delivered</Text>
        </View>
        <Text style={styles.itemCount}>Total Items 1</Text>
        <OrderItem />
      </View>

      {/* Discounts Details */}
      <View style={styles.styleDiscount}>
        <View style={styles.discountContainer}>
          <Text>Discounts</Text>
          <Text>Rs. 0</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 20,
            marginRight: 30,
          }}
        >
          <Text>Delivery Charges</Text>
          <Text>Free</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 20,
            marginRight: 30,
          }}
        >
          <Text>Total Bill Amount</Text>
          <Text>Rs. 10</Text>
        </View>
      </View>
      {/* Customer Details */}
      <View
        style={{
          flex: 0.6,
          borderBottomWidth: 1,
          borderBottomColor: "lightgray",
          marginBottom: 200,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
            }}
          >
            <Text>Customer Details</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,

                width: 260,
              }}
            >
              <View>
                <Text>Name</Text>
                <Text>Mobile</Text>
                <Text>Address</Text>
                <Text>City</Text>
              </View>
              <View
                style={{
                  marginLeft: 20,
                }}
              >
                <Text>Huzaifa Arhshad</Text>
                <Text>03312220373</Text>
                <Text>Street 55, G-9/3, Islamabad</Text>
                <Text>Islamabad</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 80,
              marginRight: 60,
            }}
          >
            <Text style={{ color: "skyblue" }}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderNumber: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",

    color: Colors.black,
  },
  orderDate: {
    fontFamily: "Poppins_300Light",
    fontSize: 12,
    color: "gray",
  },
  itemCount: {
    marginLeft: 20,
    marginTop: 30,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  orderStatus: {
    color: Colors.blue,
    marginTop: 25,
    marginRight: 40,
    fontFamily: "Poppins_500Medium",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  styleOrderItem: {
    flex: 0.85,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  styleDiscount: {
    flex: 0.45,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  discountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 30,
    marginTop: 20,
  },
});

export default OrderDetails;
