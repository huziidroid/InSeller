import styled from "styled-components";

export const InputWrapper = styled.View({
  borderTopWidth: 0.5,
  borderTopColor: "lightgray",
  borderBottomWidth: 0.5,
  borderBottomColor: "lightgray",
  backgroundColor: "#FFFFFF",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});
export const StyledInput = styled.TextInput({
  fontFamily: "Poppins_400Regular",
  fontSize: 15,
  flex: 1,
  height: 50,
  paddingLeft: 20,
  margin: 5,
  borderRadius: 10,
  backgroundColor: "#FFFFFF",
});
