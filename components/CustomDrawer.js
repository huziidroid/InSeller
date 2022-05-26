import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Colors } from "../colors";
import { Avatar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { Drawer } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import DefaultImage from "../assets/default.jpg";
import { setUser, selectUser } from "../redux/slice/userSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = ({ ...props }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      dispatch(setUser({}));
      props.navigation.dispatch(DrawerActions.closeDrawer());
      props.navigation.reset({
        index: 0,
        routes: [{ name: "login" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Avatar
          size="large"
          source={
            user.business_image_url !== null
              ? { uri: user.business_image_url }
              : DefaultImage
          }
          rounded
        />
        <Text style={styles.profile_label}>{user.name}</Text>
        <Text style={styles.profile_category}>
          {user.category ? user.category.name : "Shop"}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Drawer.Section style={styles.footer}>
        <Drawer.Item
          icon={() => (
            <AntDesign name="logout" size={24} color={Colors.secondary} />
          )}
          label={
            <Text
              style={{
                color: Colors.secondary,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Logout
            </Text>
          }
          onPress={handleSignOut}
        />
      </Drawer.Section>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  profile: {
    flexDirection: "column",
    borderBottomWidth: 0.5,
    height: 200,
    justifyContent: "space-around",
    padding: 20,
    borderRadius: 5,
  },
  profile_label: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
  },
  profile_category: {
    fontSize: 15,
    fontFamily: "Poppins_300Light",
  },
  footer: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
