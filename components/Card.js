import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../colors";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

export default Card;
const styles = StyleSheet.create({
  card: {
    position: "relative",
    backgroundColor: Colors.primary,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    borderRadius: 10,
    elevation: 5,
  },
});
