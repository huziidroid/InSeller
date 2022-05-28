import styled from "styled-components";
import { Dimensions } from "react-native";
import { Input, Button } from "react-native-elements";
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
  inputStyle: { fontSize: 14, fontFamily: "Poppins_400Regular" },
  containerStyle: { height: 50, marginVertical: 15 },
})``;

export const ButtonWrapper = styled.View({
  flex: 1,
  flexDirection: "row",
  paddingHorizontal: 20,
});
export const StyledButton = styled(Button).attrs(({ isDanger }) => ({
  buttonStyle: {
    height: 50,
    width: 150,
    borderColor: isDanger ? Colors.textDanger : Colors.primary,
    backgroundColor: isDanger ? Colors.primary : Colors.secondary,
  },
  titleStyle: {
    color: isDanger ? Colors.textDanger : Colors.primary,
  },
  containerStyle: {
    marginVertical: 80,
    marginHorizontal: 20,
  },
}))``;
