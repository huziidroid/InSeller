import styled from "styled-components";
import * as Animatable from "react-native-animatable";
import { Colors } from "../../colors";
import { Button, Input } from "react-native-elements";

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
export const FooterWrapper = styled(Animatable.View)({
  flex: 3,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  backgroundColor: Colors.primary,
  paddingHorizontal: 20,
  paddingVertical: 30,
});
export const HeaderLabel = styled.Text({
  fontSize: 25,
  fontFamily: "Poppins_700Bold",
  color: Colors.primary,
});

export const StyledInput = styled(Input).attrs({
  inputStyle: {
    flex: 1,
    fontSize: 17,
    fontFamily: "Poppins_400Regular",
    marginVertical: 5,
    height: 50,
  },
  labelStyle: {
    color: Colors.textColor,
    fontFamily: "Poppins_400Regular",
  },
})``;

export const StyledSignInButton = styled(Button).attrs(() => ({
  buttonStyle: {
    height: 50,
    borderRadius: 10,
  },
  containerStyle: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
}))``;

export const StyledSignUpButton = styled(Button).attrs({
  containerStyle: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    height: 50,
  },
})``;
