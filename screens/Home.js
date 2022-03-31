import React from "react";
import { useState } from "react";
import { View, Text, Share, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { Colors } from "../colors";
import { Avatar, Chip } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import Chart from "../components/SalesChart";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [showSales, setShowSales] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.header_label}>Mohsin Books</Text>
        <Avatar rounded title="MB" />
      </View>
      <View style={styles.footer}>
        <View style={styles.address_container}>
          <Text>Share shop address</Text>
          <View style={styles.address}>
            <Text>https://inseller.com/mohsinbooks</Text>
            <TouchableOpacity
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
            <Chip title="Store Views" containerStyle={styles.chip} />
            <Chip title="Sales" containerStyle={styles.chip} />
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
    justifyContent: "space-around",
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
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: Colors.primary,
  },
});
