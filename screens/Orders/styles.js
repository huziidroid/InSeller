import styled from "styled-components";
import { Colors } from "../../colors";

export const Container = styled.View({
  borderTopWidth: 0.5,
  borderTopColor: "lightgray",
  borderBottomWidth: 0.5,
  borderBottomColor: "lightgray",
  backgroundColor: "#FFFFFF",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});
export const SeparatorComponent = styled.View({
  height: 2,
  width: "100%",
});

export const OrderContainer = styled.TouchableOpacity({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginLeft: 20,
  marginRight: 20,
  marginBottom: 5,
  marginTop: 5,
  backgroundColor: Colors.white,
  padding: 10,
  borderRadius: 5,
  height: 60,
  elevation: "3",
});
export const OrderInfo = styled.View({
  flexDirection: "column",
});
export const OrderNumber = styled.Text({
  fontSize: 14,
  fontFamily: "Poppins_400Regular",
  color: Colors.textColor,
  marginRight: 10,
});
export const OrderPrice = styled.Text({
  fontSize: 16,
  fontFamily: "Poppins_500Medium",
  color: Colors.textColor,
  marginRight: 10,
});
export const OrderItemCount = styled.Text({
  fontSize: 12,
  fontFamily: "Poppins_500Medium",
  color: Colors.textColor,
  marginRight: 10,
});
