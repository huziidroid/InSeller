import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";

export const Icons = {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
  AntDesign,
  FontAwesome,
  MaterialIcons,
};

const Icon = ({ type, name, color, size = 24, style }) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  );
};
export default Icon;
