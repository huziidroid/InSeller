import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../colors";
import BusinessImage from "../../components/BusinessImage";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomConfirmation from "../../components/BottomConfirmation";

const Account = () => {
  const refRBSheet = useRef();
  return (
    <View style={styles.screenContainer}>
      <BusinessImage />
      <View style={styles.containerText}>
        <Text style={styles.textShopaName}>Moshin Books</Text>
        <TouchableOpacity>
          <Text style={styles.textEditDetails}>Edit Shop Details</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerBox}>
        <TouchableOpacity style={styles.box}>
          <FontAwesome5 name="bullhorn" size={24} color={Colors.primaryColor} />
          <Text>Marketing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <FontAwesome5 name="share" size={24} color={Colors.primaryColor} />
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerMenu}>
        <TouchableOpacity style={styles.menu}>
          <Ionicons
            style={styles.menuItemIcon}
            name="settings-sharp"
            size={24}
            color={Colors.primaryColor}
          />
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menu}
          onPress={() => refRBSheet.current.open()}
        >
          <SimpleLineIcons
            style={styles.menuItemIcon}
            name="logout"
            size={24}
            color={Colors.primaryColor}
          />
          <Text style={styles.menuItemText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu}>
          <MaterialCommunityIcons
            style={styles.menuItemIcon}
            name="truck-delivery-outline"
            size={24}
            color={Colors.primaryColor}
          />
          <Text style={styles.menuItemText}>Delivery Charges</Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <BottomConfirmation />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  containerText: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 40,
  },
  textShopaName: {
    fontSize: 22,
    fontFamily: "Poppins_500Medium",
    color: Colors.primaryColor,
  },
  textEditDetails: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    textDecorationLine: "underline",
    color: Colors.blue,
    paddingLeft: 30,
  },
  box: {
    backgroundColor: "#F6F7F8",
    borderRadius: 20,
    height: 130,
    width: 150,
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  containerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
  },
  containerMenu: {
    flexDirection: "column",
    marginTop: 50,
  },
  menu: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginBottom: 20,
    flexDirection: "row",
  },
  menuItemText: {
    fontSize: 17,
    fontFamily: "Poppins_500Medium",
    marginLeft: 20,
    color: Colors.primaryColor,
  },
  menuItemIcon: {
    marginLeft: 30,
  },
});
export default Account;
