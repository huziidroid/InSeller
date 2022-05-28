import { Input } from "react-native-elements";
import styled from "styled-components";
import { Colors } from "../../colors";

export const Container = styled.TouchableOpacity({ width: "100%" });
export const StyledInput = styled(Input).attrs(({ fontSize }) => ({
  inputStyle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  containerStyle: {
    height: 50,
    marginBottom: 25,
  },
  labelStyle: {
    fontSize: fontSize,
    color: Colors.textColor,
    fontFamily: "Poppins_300Light",
  },
}))``;
