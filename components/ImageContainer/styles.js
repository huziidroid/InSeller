import styled from "styled-components";

export const Container = styled.TouchableOpacity({
  alignSelf: "center",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: 90,
  width: 90,
  borderRadius: 5,
  borderWidth: 0.5,
  margin: 5,
});

export const PictureBoxLabel = styled.Text({
  fontSize: 11,
  fontFamily: "Poppins_300Light",
});
