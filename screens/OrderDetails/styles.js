import styled from "styled-components";
import { Colors } from "../../colors";

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  style: {},
})``;

export const OrderItemContainer = styled.View({
  flex: 1,
  borderBottomColor: "lightgray",
  borderBottomWidth: 1,
});
export const Wrapper = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
});
export const TextWrapper = styled.View({
  marginLeft: 20,
  marginTop: 10,
});
export const OrderNumber = styled.Text({
  fontSize: 16,
  fontFamily: "Poppins_500Medium",
  color: Colors.textColor,
});
export const OrderDate = styled.Text({
  fontFamily: "Poppins_300Light",
  fontSize: 12,
  color: "gray",
});
export const OrderStatus = styled.Text(({ status }) => ({
  color: status === "Delivered" ? Colors.secondary : Colors.textDanger,
  marginTop: 25,
  marginRight: 40,
  fontFamily: "Poppins_500Medium",
  fontWeight: "600",
}));
export const OrderItemCount = styled.Text({
  marginLeft: 20,
  marginTop: 30,
  fontFamily: "Poppins_400Regular",
  fontSize: 14,
});
export const AmountContainer = styled.View({
  flex: 1,
  borderBottomWidth: 1,
  borderBottomColor: "lightgray",
});
export const TextRow = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  marginHorizontal: 20,
  marginVertical: 15,
});
export const Label = styled.Text({
  fontFamily: "Poppins_400Regular",
  fontSize: 14,
  color: Colors.textColor,
});
export const Value = styled.Text(({ color }) => ({
  fontFamily: "Poppins_500Medium",
  fontSize: 14,
  color: color,
}));

export const CustomerDetailsContainer = styled.View({
  flex: 1,
  borderBottomWidth: 1,
  borderBottomColor: "lightgray",
  flexDirection: "column",
  paddingBottom: 20,
  paddingTop: 10,
});
export const CustomerDetailLabel = styled.Text({
  fontFamily: "Poppins_500Medium",
  fontSize: 14,
  color: Colors.textColor,
  marginLeft: 20,
  marginVertical: 10,
});
export const DetailRow = styled.View({
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "center",
  width: "80%",
  marginLeft: 20,
  marginVertical: 5,
});
export const PhoneNumber = styled.TouchableOpacity({});
