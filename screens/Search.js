import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Toast from "react-native-root-toast";
import * as Location from "expo-location";
import { Input } from "react-native-elements";

const Search = ({ navigation }) => {
  const initialRegion = {
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [region, setRegion] = useState(initialRegion);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.show("Permission to location was denied", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          animation: true,
        });
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        Toast.show("Location fetched Successfully", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          animation: true,
        });
      } catch (error) {
        Toast.show("Location fetching failed", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          animation: true,
        });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        loadingEnabled={true}
        onRegionChange={(region) => setRegion(region)}
        initialRegion={region}
      >
        <Marker
          coordinate={region ? region : initialRegion}
          title="Mohsin Books"
          description="Mohsin Books"
        />
      </MapView>

      <Input label="Search" placeholder="Search for distributors" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.5,
  },
});

export default Search;
