import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
} from "react-native-maps";
import * as Location from "expo-location";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import { getStores } from "../firestoreFunctions";
import { Button, Divider } from "@rneui/base";
import { Card, ButtomSheet, Image } from "@rneui/themed";
import { sortListbyDistance } from "../useful-functions";
export default function MapPage({ location }) {
  console.log("Location :", location);
  const mapRef = useRef(null);
  // const [currentLocation, setCurrentLocation] = useState(location);
  // const [initialRegion, setInitialRegion] = useState({
  //   latitude: location.latitude,
  //   longitude: location.longitude,
  //   latitudeDelta: 0.01,
  //   longitudeDelta: 0.01,
  // });
  const [markers, setMarkers] = useState([]);
  const [coordsStore, setcoordsStores] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0002,
    longitudeDelta: 0.0002,
  });
  const [scrolled, setScrolled] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [scanNewArea, setScanNewArea] = useState(false);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0002,
    longitudeDelta: 0.0002,
  });
  // useEffect(() => {
  //   const getLocation = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.log("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});

  //     setInitialRegion({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01,
  //     });
  //     setcoordsStores({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01,
  //     });
  //   };
  //   getLocation();
  // }, []);

  // useEffect(() => {
  //   setcoordsStores(initialRegion);
  // }, []);

  useEffect(() => {
    const fetchMarkers = async () => {
      const storefetch = await getStores(
        coordsStore.latitude,
        coordsStore.longitude
      );
      setMarkers(storefetch);
    };
    fetchMarkers();
    console.log("set current markers");
    console.log(markers);
  }, [scanNewArea]);

  const scanHerePress = () => {
    setcoordsStores(currentRegion);
    setScanNewArea(!scanNewArea);
    setScrolled(false);
  };

  if (!coordsStore)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        region={currentRegion}
        showsUserLocation={true}
        loadingEnabled={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={(region) => {
          setCurrentRegion(region);
          setScrolled(true);
        }}
        // mapType="mutedStandard"
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
      >
        {markers != null && mapMarkers(markers)}
      </MapView>
      {scrolled && (
        <Button
          title="scan here"
          buttonStyle={{
            backgroundColor: "rgba(78, 116, 289, 1)",
            borderRadius: 3,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
            position: "absolute",
            top: 50,
            alignSelf: "center",
          }}
          onPress={scanHerePress}
        />
      )}
    </>
  );
}

const mapMarkers = (markers, setActiveMarker) => {
  return markers.map((marker, index) => (
    <Marker
      coordinate={{
        latitude: marker.coords.latitude,
        longitude: marker.coords.longitude,
      }}
      title={marker.name}
      key={`${marker.storeId} + ${index}`}
      image={require("../assets/coffeemarker.png")}
      // width={12}
      // height={12}
      // onClick={setActiveMarker(marker)}
      // onDeselect={setActiveMarker(null)}
      description={`${marker.location.substr(
        0,
        marker.location.lastIndexOf(",")
      )}`}
    ></Marker>
  ));
};

// function MarkerPopup(activeMarker) {
//   console.log("activeMarker");
//   console.log(activeMarker);
//   return (
//     <Card style={{ position: "absolute", zIndex: 1 }}>
//       <Card.Title>{activeMarker.name}</Card.Title>
//       <Image source={{ uri: getStoreLogo(activeMarker.logo) }} />
//       <Text></Text>
//     </Card>
//   );
// }
