import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Share } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { Colors } from "../colors";
import { Avatar, Chip } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import Chart from "../components/SalesChart";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";
import OrderDescription from "../components/OrderDescription";
import { selectUser } from "../redux/slice/userSlice";

const Home = ({ navigation }) => {
  const [showSales, setShowSales] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const user = useSelector(selectUser);
  const url = `https://inseller.netlify.app`;
  const onShare = async () => {
    await Share.share({
      message: `Hi, you can now order from ${user.name} web store.\n\nContact us at ${user.phone_number} for more details.\n\n${url}`,
      title: `${user.name} Web Store`,
    })
      .then(() => {
        // Success
      })
      .catch((error) => {
        // Failure
      });
  };
  const copyToClipboard = async () => {
    await Clipboard.setString(url)
      .then(() => {
        Toast.show("Copied to clipboard", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      })
      .catch(() => {
        Toast.show("Error copying to clipboard", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      });
  };
  useEffect(() => {
    console.log(user.name);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View
          style={{
            width: "50%",
          }}
        >
          <Text style={styles.header_label}>{user.name}</Text>
        </View>
        <Avatar rounded title="MB" />
      </View>
      <View style={styles.footer}>
        <View style={styles.address_container}>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 15,
            }}
          >
            Share shop address
          </Text>
          <View style={styles.address}>
            <TouchableOpacity onPress={copyToClipboard}>
              <Text>{url.slice(0, 30) + (url.length > 30 ? "..." : "")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onShare}
              style={{
                padding: 3,
                borderWidth: 1,
                borderRadius: 3,
                borderColor: "gray",
              }}
            >
              <Entypo name="share" size={17} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{
            bottom: 50,
          }}
        >
          <ScrollView horizontal={true}>
            <Chip
              buttonStyle={{
                backgroundColor: showSales ? Colors.secondary : null,
              }}
              title="Sales"
              containerStyle={styles.chip}
              onPress={() => {
                setShowSales(true);
                setShowOrders(false);
              }}
              type={showSales ? "solid" : "outline"}
            />
            <Chip
              buttonStyle={{
                backgroundColor: showOrders ? Colors.secondary : null,
              }}
              title="Orders"
              containerStyle={styles.chip}
              type={showOrders ? "solid" : "outline"}
              onPress={() => {
                setShowOrders(true);
                setShowSales(false);
              }}
            />
            {/* <Chip title="Store Views" containerStyle={styles.chip} /> */}
          </ScrollView>
          {showSales ? (
            <Animatable.View animation="pulse">
              <Chart />
            </Animatable.View>
          ) : null}
          {showOrders ? (
            <Animatable.View animation="pulse">
              <Chart />
            </Animatable.View>
          ) : null}
          <View>
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: 15,
              }}
            >
              Recent Orders
            </Text>
            <OrderDescription
              orderNumber="101-0002347"
              itemCount="10"
              orderAmount="200"
            />
            <OrderDescription
              orderNumber="101-0002348"
              itemCount="5"
              orderAmount="1000"
            />
            <OrderDescription
              orderNumber="101-0002348"
              itemCount="5"
              orderAmount="1000"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    flex: 0.5,
    flexDirection: "row",
    height: 100,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingBottom: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  address_container: {
    height: "20%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    justifyContent: "space-evenly",
    bottom: 80,
    paddingHorizontal: 20,
    elevation: 5,
  },
  address: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 10,
    width: 120,
    marginBottom: 10,
  },
  footer: {
    flex: 3,
    height: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header_label: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    color: Colors.primary,
    textAlign: "center",
  },
});
