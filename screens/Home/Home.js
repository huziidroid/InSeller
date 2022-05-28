import React, { useEffect } from "react";
import { useState } from "react";
import { Text, Share } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../colors";
import { Avatar } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";
import OrderDescription from "../../components/OrderDescription";
import { selectUser } from "../../redux/slice/userSlice";
import { ptData } from "./dummyData";
import Chart from "../../components/Chart";
import { ScreenWrapper } from "react-native-screen-wrapper";
import {
  Container,
  AddressBar,
  AddressLabel,
  AddressWrapper,
  ChipWrapper,
  FooterWrapper,
  HeaderLabel,
  HeaderWrapper,
  ScrollWrapper,
  ShareButton,
  StyledChip,
  OrderWrapper,
  OrderLabel,
} from "./styles";
import { addToast } from "../../utils";

const Home = ({ navigation }) => {
  const [showSales, setShowSales] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const user = useSelector(selectUser);
  const url = `https://inseller.netlify.app`;
  const onShare = async () => {
    await Share.share({
      message: `Hi, you can now order from ${user?.name} web store.\n\nContact us at ${user?.phone_number} for more details.\n\n${url}`,
      title: `${user?.name} Web Store`,
    })
      .then(() => {
        // Success
      })
      .catch((error) => {
        // Failure
      });
  };
  const copyToClipboard = async () => {
    await Clipboard.setString(url)
      .then(() => {
        addToast("Copied to clipboard", false);
      })
      .catch(() => {
        addToast("Error while copying to clipboard", true);
      });
  };

  const handleChipPress = () => {
    setShowSales(!showSales);
    setShowOrders(!showOrders);
  };

  return (
    <ScreenWrapper barStyle="light-content" statusBarColor={Colors.secondary}>
      <Container>
        <HeaderWrapper>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <HeaderLabel>{user?.name}</HeaderLabel>
          <Avatar rounded title="MB" />
        </HeaderWrapper>
        <FooterWrapper>
          <AddressWrapper>
            <AddressLabel>Share shop address</AddressLabel>
            <AddressBar>
              <TouchableOpacity onPress={copyToClipboard}>
                <Text>{url.slice(0, 30) + (url.length > 30 ? "..." : "")}</Text>
              </TouchableOpacity>
              <ShareButton onPress={onShare}>
                <Entypo name="share" size={17} color="black" />
              </ShareButton>
            </AddressBar>
          </AddressWrapper>
          <ScrollWrapper>
            <ChipWrapper horizontal={true}>
              <StyledChip
                isSelected={showSales}
                title="Sales"
                onPress={handleChipPress}
              />
              <StyledChip
                isSelected={showOrders}
                title="Orders"
                onPress={handleChipPress}
              />
            </ChipWrapper>
            {showSales && <Chart data={ptData} />}
            <OrderWrapper>
              <OrderLabel>Recent Orders</OrderLabel>
              <OrderDescription
                orderNumber="101-0002347"
                itemCount="10"
                orderAmount="200"
              />
              <OrderDescription
                orderNumber="101-0002348"
                itemCount="5"
                orderAmount="1000"
              />
              <OrderDescription
                orderNumber="101-0002348"
                itemCount="5"
                orderAmount="1000"
              />
            </OrderWrapper>
          </ScrollWrapper>
        </FooterWrapper>
      </Container>
    </ScreenWrapper>
  );
};

export default Home;
