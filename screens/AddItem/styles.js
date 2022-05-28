import styled from "styled-components";
import { Input, Button } from "react-native-elements";
import { Dimensions } from "react-native";
import { Colors } from "../../colors";

const { width, height } = Dimensions.get("window");

export const Container = styled.View({
  flex: 1,
  height: height,
  width: width,
  backgroundColor: "#fff",
  paddingHorizontal: 10,
  paddingVertical: 30,
});

export const InputWrapper = styled.View({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
});

export const StyledInput = styled(Input).attrs({
  inputStyle: { fontSize: 13, fontFamily: "Poppins_400Regular" },
  containerStyle: { height: 50, marginVertical: 15 },
  labelStyle: {
    fontSize: 12,
    color: Colors.textColor,
    fontFamily: "Poppins_300Light",
  },
})``;

export const HorizontalInputWrapper = styled.View({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  maxWidth: "50%",
});

export const ButtonWrapper = styled.View({
  flex: 1,
  flexDirection: "row",
  paddingHorizontal: 20,
});
export const StyledButton = styled(Button).attrs({
  buttonStyle: { height: 50, width: 150, backgroundColor: Colors.secondary },
  containerStyle: { marginVertical: 40, marginHorizontal: 30 },
})``;
