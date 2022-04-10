import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
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
import { signOut } from "../redux/User/user.action";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = ({ ...props }) => {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Avatar
          size="large"
          source={
            user.user.business_image_url !== null
              ? { uri: user.user.business_image_url }
              : DefaultImage
          }
          rounded
        />
        <Text style={styles.profile_label}>{user.user.name}</Text>
        <Text style={styles.profile_categgory}>The Book Shop</Text>
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
          onPress={() => {
            props.navigation.dispatch(DrawerActions.closeDrawer());
            dispatch(signOut());
            navigation.reset({
              index: 0,
              routes: [{ name: "login" }],
            });
          }}
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
  profile_categgory: {
    fontSize: 15,
    fontFamily: "Poppins_300Light",
  },
  footer: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
});
