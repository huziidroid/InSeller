import React from 'react'
import { View, Text } from 'react-native'

const ContainerShopName = (props) => {
    return (
        <View
          style={{
            flex: 0.9,
            flexDirection: "column",
            backgroundColor: "#5F939A",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              marginLeft: 25,
              marginTop: 15,
              fontFamily: "Poppins_500Medium",
              fontSize: 25,
              color: "#F6F7F8",
            }}
          >
            {props.shopName}
          </Text>
          <View
            style={{
              backgroundColor: "#F6F7F8",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              height: 30,
            }}
          ></View>
        </View>
      );
}

export default ContainerShopName
