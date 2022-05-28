import { Entypo } from "@expo/vector-icons";
import styled from "styled-components";
import { Colors } from "../../colors";

export const Container = styled.View({ flex: 1 });

export const ItemSeparatorComponent = styled.View({
  height: 2,
  width: "100%",
});
export const ItemContainer = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: 15,
  marginBottom: 5,
  marginTop: 5,
  backgroundColor: Colors.white,
  paddingLeft: 10,
  paddingVertical: 10,
  borderRadius: 5,
  elevation: "3",
});

export const TextWrapper = styled.TouchableOpacity({
  flex: 1,
  justifyContent: "center",
  alignItems: "flex-start",
  marginLeft: 20,
});

export const ItemName = styled.Text({
  fontSize: 16,
  fontFamily: "Poppins_400Regular",
});

export const ItemStatus = styled.Text(({ status }) => ({
  color: status ? "green" : "gray",
  fontFamily: "Poppins_300Light",
  fontSize: 10,
}));

export const PriceWrappper = styled.View({
  flexDirection: "row",
  alignItems: "center",
});

export const Price = styled.Text({
  fontSize: 16,
  fontFamily: "Poppins_500Medium",
  color: "gray",
  marginRight: 10,
});

export const StyledEntypoIcon = styled(Entypo)({
  marginRight: 10,
  color: Colors.secondary,
});
