import { Input, Button } from "react-native-elements";
import styled from "styled-components";
import { Colors } from "../../colors";
import * as Animatable from "react-native-animatable";

export const Container = styled.View({
  flex: 1,
  backgroundColor: Colors.secondary,
});

export const HeaderWrapper = styled.View({
  flex: 1,
  backgroundColor: Colors.secondary,
  paddingHorizontal: 20,
  paddingBottom: 50,
  justifyContent: "flex-end",
});

export const HeaderText = styled.Text({
  fontSize: 25,
  fontFamily: "Poppins_700Bold",
  color: Colors.primary,
});

export const FooterWrapper = styled(Animatable.View)({
  flex: 3,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  backgroundColor: Colors.primary,
  paddingHorizontal: 20,
  paddingVertical: 30,
});

export const StyledInput = styled(Input)({
  flex: 1,
  fontSize: 17,
  fontFamily: "Poppins_400Regular",
  marginVertical: 5,
  height: 50,
});
export const StyledInputTitle = styled.Text({
  color: Colors.textColor,
  fontFamily: "Poppins_400Regular",
  fontWeight: "bold",
});

export const StyledSignInButton = styled(Button).attrs({
  contentContainerStyle: {
    marginBottom: 15,
    marginHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: Colors.secondary,
    height: 50,
    marginTop: 40,
    borderRadius: 10,
  },
})``;

export const StyledSignUpButton = styled(Button).attrs({
  containerStyle: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  buttonStyle: {
    borderRadius: 10,
    height: 50,
  },
})``;
