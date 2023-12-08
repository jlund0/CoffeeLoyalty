import { Camera, CameraType } from "expo-camera";
import { enableNetwork } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";

export function StoreScreen({store}) {
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  
  // if (!permission) {
  //   // Camera permissions are still loading
  //   requestPermission
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet
  //   return <View style={styles.container} />;
  // }

  return (
    <View style={styles.container}>
      <Text>{store.name}</Text>
      <Image source={{uri:store.logo}}/>
      <Text>Scan Customers QR</Text>
      <Camera style={styles.camera} ></Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    width: "75%",
    height:"50%"
  },
});
