import styled from "styled-components";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../../colors";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View({
  backgroundColor: "#fff",
  marginLeft: 5,
});
export const StyledSelectDropdown = styled(SelectDropdown).attrs({
  buttonStyle: {
    height: 40,
    width: width * 0.45,
  },
  buttonTextStyle: {
    fontSize: 12,
    fontFamily: "Poppins_300Light",
  },
})``;

export const SelectLabel = styled.Text({
  fontSize: 12,
  color: Colors.textColor,
  fontFamily: "Poppins_700Bold",
  marginVertical: 10,
});
