import React from "react";
import { useState } from "react";
import { View, Text, Share, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatList } from "react-native";

const ContainerShopName = (props) => {
  return (
    <View
      style={{
        flex: 0.9,
        flexDirection: "column",
        backgroundColor: "#5F939A",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          marginLeft: 25,
          marginTop: 15,
          fontFamily: "Poppins_500Medium",
          fontSize: 25,
          color: "#F6F7F8",
        }}
      >
        {props.shopName}
      </Text>
      <View
        style={{
          backgroundColor: "#F6F7F8",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 30,
        }}
      ></View>
    </View>
  );
};
const ContainerShopAddress = (props) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        url: props.shopAddress,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //alert(error.url);
    }
  };
  return (
    <View
      style={{
        flex: 0.45,
        backgroundColor: "#F6F7F8",
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 20,
        elevation: 5,
        bottom: "18%",
        justifyContent: "space-between",
        // borderBottomWidth: 1,
        shadowColor: "#7f5df0",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          color: "black",
          paddingTop: 15,
          paddingLeft: 20,
          fontSize: 15,
        }}
      >
        Share Your Shop Address
      </Text>
      <View
        style={{
          flex: 0.6,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#5F939A",
          borderRadius: 10,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 10,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Poppins_400Regular",
            color: "#0E71EF",
            marginLeft: 15,
          }}
          numberOfLines={1}
        >
          {props.shopAddress.length < 25
            ? `${props.shopAddress}`
            : `${props.shopAddress.substring(0, 25)}...`}
        </Text>

        <TouchableOpacity
          style={{
            marginRight: 15,
            borderRadius: 5,
            backgroundColor: "#D6D6D6",
            padding: 5,
            elevation: 5,
            margin: 0,
          }}
          onPress={onShare}
        >
          <AntDesign
            name="sharealt"
            size={25}
            color="#363636"
            style={{
              height: 25,
              width: 25,
            }}
          ></AntDesign>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ContainerBody = (props) => {
  const [activeTab, setActiveTab] = useState("All");
  return (
    <View
      style={{
        flex: 3,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#F6F7F8",
      }}
    >
      <ContainerShopAddress shopAddress={props.shopAddress} />
      <ContainerOrderOverView
        overView={props.overView}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ContainerOrder activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};
const ContainerOrderOverView = (props) => {
  const [OverView, setOverView] = useState("Lifetime");
  return (
    <View
      style={{
        flex: 0.45,
        backgroundColor: "#F6F7F8",
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 20,
        elevation: 5,
        bottom: "15%",
        // borderBottomWidth: 1,
        shadowColor: "#7f5df0",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      }}
    >
      <View
        style={{
          flex: 1.4,
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 25,
          marginRight: 25,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 15,
            color: "#2E2E2D",
            marginTop: 1,
          }}
        >
          Overview
        </Text>
        <Picker
          selectedValue={OverView}
          onValueChange={(itemValue, itemIndex) => setOverView(itemValue)}
          style={{
            backgroundColor: "#F6F7F8",
            width: 120,
            fontFamily: "Poppins_400Regular",
            color: "#2E2E2D",
            marginRight: -10,
            marginTop: -10,
          }}
        >
          <Picker.Item
            label="Life Time"
            value="lifetime"
            style={styles.pickerItem}
          />
          <Picker.Item
            label="Last Week"
            value="weekly"
            style={styles.pickerItem}
          />
          <Picker.Item
            label="Last Month"
            value="monthly"
            style={styles.pickerItem}
          />
        </Picker>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 10,
        }}
      >
        <Text style={styles.overViewText}>
          {props.overView.timespan === OverView
            ? `${props.overView.orders}`
            : `${0}`}
        </Text>
        <Text style={styles.overViewText}>
          {props.overView.timespan === OverView
            ? `${props.overView.sale}`
            : `${0}`}
        </Text>
        <Text style={styles.overViewText}>
          {props.overView.timespan === OverView
            ? `${props.overView.items}`
            : `${0}`}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginLeft: 15,
        }}
      >
        <Text style={styles.overViewLabel}>Orders</Text>
        <Text style={styles.overViewLabel}>Total Sale</Text>
        <Text style={styles.overViewLabel}>Total Items</Text>
      </View>
      <AllOrders
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
};

const AllOrders = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        top: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Text>Orders</Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Order")}
        >
          <Text
            style={{
              marginRight: 7,
            }}
          >
            View all
          </Text>
          <AntDesign name="arrowright" size={15} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <TabButton
          label="All"
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
        <TabButton
          label="Pending"
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
        <TabButton
          label="Accepted"
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
        <TabButton
          label="Shipped"
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
      </View>
    </View>
  );
};

const TabButton = (props) => {
  return (
    <TouchableOpacity
      style={
        props.activeTab === props.label
          ? styles.activeTabStyle
          : styles.tabStyle
      }
      onPress={() => props.setActiveTab(props.label)}
    >
      <Text>{props.label}</Text>
    </TouchableOpacity>
  );
};

const ContainerOrder = (props) => {
  const data = [
    {
      orderNumber: "101 - 2214321",
      orderAmount: 100,
      itemCount: 2,
      status: "Pending",
    },
    {
      orderNumber: "101 - 2214321",
      orderAmount: 300,
      itemCount: 2,
      status: "Pending",
    },
    {
      orderNumber: "101 - 2214321",
      orderAmount: 200,
      itemCount: 2,
      status: "Accepted",
    },
    {
      orderNumber: "101 - 2214321",
      orderAmount: 200,
      itemCount: 2,
      status: "Accepted",
    },
    {
      orderNumber: "101 - 2214321",
      orderAmount: 200,
      itemCount: 2,
      status: "Shipped",
    },
    {
      orderNumber: "101 - 2214321",
      orderAmount: 200,
      itemCount: 2,
      status: "Shipped",
    },
    {
      orderNumber: "101 - 2214321",
      orderAmount: 200,
      itemCount: 2,
      status: "Pending",
    },
    {
      orderNumber: "101 - 2214321",
      orderAmount: 200,
      itemCount: 2,
      status: "Shipped",
    },
  ];
  // const data = [];
  if (data.length != 0) {
    return (
      <FlatList
        style={{
          flex: 1,
          backgroundColor: "#F6F7F8",
          marginBottom: 75,
        }}
        data={data}
        renderItem={({ item }) => (
          <OrderDescription
            orderNumber={item.orderNumber}
            itemCount={item.itemCount}
            orderAmount={item.orderAmount}
            status={item.status}
          />
        )}
        keyExtractor={(item, index) => index}
      ></FlatList>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F6F7F8",
          marginBottom: 75,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No orders found</Text>
      </View>
    );
  }
};

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
        padding: 10,
        borderRadius: 10,
        height: 50,
        elevation: 3,
      }}
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate("OrderDetails", {
          order_detail: {
            orderNumber: props.orderNumber,
            item: props.itemCount,
            orderAmount: props.orderAmount,
            status: props.status,
          },
        })
      }
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

const Home = () => {
  let overView = {
    orders: 8,
    sale: 10,
    items: 90,
    timespan: "weekly",
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ContainerShopName shopName="Mohsin Books" />
      <ContainerBody
        shopAddress="https://InSeller.com/mohsinbooks"
        overView={overView}
      />
    </View>
  );
  // return (
  //   <View>
  //     <Text onPress={() => navigation.navigate("OrderDetails")}>Click me</Text>
  //   </View>
  // );
};

export default Home;

const styles = StyleSheet.create({
  overViewText: {
    fontSize: 25,
    fontFamily: "Poppins_500Medium",
    color: "#5F939A",
  },
  overViewLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
  },
  pickerItem: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: "#2E2E2D",
  },
  tabStyle: {
    borderRadius: 10,
    height: 27,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabStyle: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    borderWidth: 1,
    height: 27,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
