import styled from "styled-components";
import { Colors } from "../../colors";

export const Container = styled.View({
  paddingVertical: 50,
  paddingLeft: 5,
  backgroundColor: Colors.secondaryAlpha,
  borderRadius: 10,
  width: "90%",
});

export const PointerWrapper = styled.View({
  height: 100,
  width: 100,
  justifyContent: "center",
  marginTop: -30,
  marginLeft: -40,
});

export const DateLabel = styled.Text({
  color: Colors.black,
  fontSize: 15,
  marginBottom: 5,
  textAlign: "center",
});
export const ValueLabel = styled.Text({
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 15,
});
export const ValueWrapper = styled.View({
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 16,
  backgroundColor: Colors.white,
});
