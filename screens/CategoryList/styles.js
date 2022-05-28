import { Entypo } from "@expo/vector-icons";
import styled from "styled-components";
import { Colors } from "../../colors";

export const ItemSeparatorComponent = styled.View({
  height: 2,
  width: "100%",
});

export const CategoryWrapper = styled.View({
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: 20,
  marginVertical: 5,
  backgroundColor: Colors.white,
  paddingLeft: 10,
  paddingVertical: 10,
  borderRadius: 5,
  elevation: "5",
});

export const DescriptionWrapper = styled.TouchableOpacity({
  flex: 1,
  justifyContent: "center",
  alignItems: "flex-start",
  marginLeft: 20,
  width: "50%",
});
export const CategoryName = styled.Text({
  fontSize: 14,
  fontFamily: "Poppins_400Regular",
  color: Colors.textColor,
});
export const IconWrapper = styled.TouchableOpacity({
  flexDirection: "row",
  alignItems: "center",
});
export const StyledEntypoIcon = styled(Entypo)({
  marginRight: 30,
  color: Colors.secondary,
});
