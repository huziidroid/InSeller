import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image } from "react-native";
import { Container, PictureBoxLabel } from "./styles";

const ImageContainer = ({ image, onPress }) => {
  return (
    <Container onPress={onPress}>
      {Object.keys(image).length === 0 ? (
        <>
          <Feather name="camera" size={17} color="black" />
          <PictureBoxLabel>Add Image</PictureBoxLabel>
        </>
      ) : (
        <Image
          source={{ uri: image.uri }}
          style={{ width: "95%", height: "95%" }}
        />
      )}
    </Container>
  );
};

export default ImageContainer;
