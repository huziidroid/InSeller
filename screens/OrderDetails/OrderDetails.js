import React from "react";
import { Linking } from "react-native";
import { ScreenWrapper } from "react-native-screen-wrapper";
import { Colors } from "../../colors";
import OrderItem from "../../components/OrderItem";
import {
  Container,
  OrderItemContainer,
  OrderNumber,
  OrderDate,
  TextWrapper,
  Wrapper,
  OrderStatus,
  OrderItemCount,
  TextRow,
  AmountContainer,
  Label,
  Value,
  CustomerDetailsContainer,
  CustomerDetailLabel,
  DetailRow,
  PhoneNumber,
} from "./styles";

const OrderDetails = ({ route }) => {
  const { order } = route.params;
  return (
    // main__container
    <ScreenWrapper barStyle="dark-content" statusBarColor={Colors.white}>
      <Container>
        {/* Order Item Details */}
        <OrderItemContainer>
          <Wrapper>
            <TextWrapper>
              <OrderNumber>{order?.order_no}</OrderNumber>
              <OrderDate>{new Date(order?.createdAt).toDateString()}</OrderDate>
            </TextWrapper>
            <OrderStatus status={order?.status}>{order?.status}</OrderStatus>
          </Wrapper>
          <OrderItemCount>{`Total Items # ${order?.items?.length}`}</OrderItemCount>
          <>
            {order?.items?.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </>
        </OrderItemContainer>

        <AmountContainer>
          <TextRow>
            <Label>Delivery Charges</Label>
            <Value color={Colors.textColor}>Free</Value>
          </TextRow>
          <TextRow>
            <Label>Total Amount</Label>
            <Value color={Colors.textColor}>{`Rs. ${order?.amount}`}</Value>
          </TextRow>
        </AmountContainer>

        <CustomerDetailsContainer>
          <CustomerDetailLabel>Customer Details</CustomerDetailLabel>
          <DetailRow>
            <Label>Name</Label>
            <Value color={Colors.textColor}>
              {order?.customer_details?.name}
            </Value>
          </DetailRow>
          <DetailRow>
            <Label>Phone Number</Label>
            <PhoneNumber
              onPress={() =>
                Linking.openURL(`tel:${order?.customer_details?.mobile}`)
              }
            >
              <Value color={Colors.secondary}>
                {order?.customer_details?.mobile}
              </Value>
            </PhoneNumber>
          </DetailRow>
          <DetailRow>
            <Label>City</Label>
            <Value color={Colors.textColor}>
              {order?.customer_details?.city}
            </Value>
          </DetailRow>
          <DetailRow>
            <Label>Address</Label>
            <Value color={Colors.textColor}>
              {order?.customer_details?.address}
            </Value>
          </DetailRow>
          <DetailRow>
            <Label>Order Notes</Label>
            <Value color={Colors.textColor} numberOfLines={1}>
              {order?.customer_details?.notes.slice(0, 25) + "..."}
            </Value>
          </DetailRow>
        </CustomerDetailsContainer>
      </Container>
    </ScreenWrapper>
  );
};

export default OrderDetails;
