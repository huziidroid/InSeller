import React from 'react'
import { View, Text } from 'react-native'

const ContainerShopAddress = (props) => {
    const onShare = async () => {
      try {
        const result = await Share.share({
          url: props.shopAddress,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        //alert(error.url);
      }
    };
    return (
      <View
        style={{
          flex: 0.45,
          backgroundColor: "#F6F7F8",
          marginLeft: 15,
          marginRight: 15,
          borderRadius: 20,
          elevation: 5,
          bottom: "18%",
          justifyContent: "space-between",
          // borderBottomWidth: 1,
          shadowColor: "#7f5df0",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            color: "black",
            paddingTop: 15,
            paddingLeft: 20,
            fontSize: 15,
          }}
        >
          Share Your Shop Address
        </Text>
        <View
          style={{
            flex: 0.6,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#5F939A",
            borderRadius: 10,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 10,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Poppins_400Regular",
              color: "#0E71EF",
              marginLeft: 15,
            }}
            numberOfLines={1}
          >
            {props.shopAddress.length < 25
              ? `${props.shopAddress}`
              : `${props.shopAddress.substring(0, 25)}...`}
          </Text>
  
          <TouchableOpacity
            style={{
              marginRight: 15,
              borderRadius: 5,
              backgroundColor: "#D6D6D6",
              padding: 5,
              elevation: 5,
              margin: 0,
            }}
            onPress={onShare}
          >
            <AntDesign
              name="sharealt"
              size={25}
              color="#363636"
              style={{
                height: 25,
                width: 25,
              }}
            ></AntDesign>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default ContainerShopAddress
