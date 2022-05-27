import styled from "styled-components";
import { Colors } from "../../colors";
import { Chip } from "react-native-elements";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View({
  flex: 1,
  backgroundColor: Colors.secondary,
});

export const HeaderWrapper = styled.View({
  flex: 0.5,
  flexDirection: "row",
  height: 100,
  backgroundColor: Colors.secondary,
  paddingHorizontal: 20,
  paddingBottom: 50,
  justifyContent: "space-between",
  alignItems: "center",
});

export const HeaderLabel = styled.Text({
  fontSize: 18,
  fontFamily: "Poppins_500Medium",
  color: Colors.primary,
  textAlign: "center",
});
export const FooterWrapper = styled.View({
  flex: 3,
  height: 100,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  backgroundColor: Colors.primary,
  paddingHorizontal: 15,
  paddingVertical: 30,
});

export const StyledChip = styled(Chip).attrs(({ isSelected }) => ({
  containerStyle: {
    paddingHorizontal: 10,
    width: 120,
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: isSelected ? Colors.secondary : null,
  },
  type: isSelected ? "solid" : "outline",
}))``;

export const AddressWrapper = styled.View({
  height: "20%",
  backgroundColor: Colors.primary,
  borderRadius: 10,
  justifyContent: "space-evenly",
  bottom: 80,
  paddingHorizontal: 20,
  elevation: "5",
});
export const AddressLabel = styled.Text({
  fontFamily: "Poppins_400Regular",
  fontSize: 15,
});

export const AddressBar = styled.View({
  borderRadius: 10,
  borderWidth: 1,
  padding: 10,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ShareButton = styled.TouchableOpacity({
  padding: 3,
  borderWidth: 1,
  borderRadius: 3,
  borderColor: "gray",
});

export const ScrollWrapper = styled.ScrollView({
  bottom: 50,
  width: width,
});
export const ChipWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
}))``;

export const OrderWrapper = styled.View({
  flex: 1,
});
export const OrderLabel = styled.Text({
  fontFamily: "Poppins_700Bold",
  fontSize: 18,
  marginBottom: 10,
});
