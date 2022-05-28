import styled from "styled-components";
import { Dimensions } from "react-native";
import { Button, Input } from "react-native-elements";
import { Colors } from "../../colors";

const { width, height } = Dimensions.get("window");

export const Container = styled.View({
  flex: 1,
  height: height,
  width: width,
  backgroundColor: "#fff",
  paddingHorizontal: 10,
  paddingVertical: 60,
});

export const InputWrapper = styled.View({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
});

export const StyledInput = styled(Input).attrs({
  labelStyle: {
    fontSize: 13,
    color: Colors.textColor,
    fontFamily: "Poppins_300Light",
  },
  inputStyle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginTop: 5,
  },
  containerStyle: { height: 50, marginVertical: 15 },
})``;

export const StyledButton = styled(Button).attrs({
  buttonStyle: { height: 50, width: 150, backgroundColor: Colors.secondary },

  containerStyle: { marginVertical: 80, marginHorizontal: 30 },
})``;
