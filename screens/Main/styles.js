import { Button } from "react-native-elements";
import styled from "styled-components";
import { Colors } from "../../colors";

export const Container = styled.View({
  flex: 1,
  justifyContent: "space-evenly",
  alignItems: "center",
});

export const LabelText = styled.Text({
  fontSize: 40,
  fontFamily: "Poppins_700Bold",
  color: Colors.primaryColor,
});

export const InfoTextWrapper = styled.View({
  justifyContent: "center",
  alignItems: "center",
  marginTop: 20,
  marginBottom: 20,
});

export const InfoText = styled.Text({
  fontSize: 18,
  fontFamily: "Poppins_400Regular",
  color: Colors.secondaryColor,
  textAlign: "center",
});
export const StyledButton = styled(Button)({
  backgroundColor: Colors.secondaryColor,
  borderRadius: 10,
  width: "80%",
  marginTop: 20,
  marginBottom: 20,
});
