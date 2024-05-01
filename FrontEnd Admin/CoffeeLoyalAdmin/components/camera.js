import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import IonIcons from "react-native-vector-icons/Ionicons";

export default function BarcodeCamera({ navigation, store }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("qr Scanned");
    console.log(data.split("/")[0]);
    if (data.split("/")[1] == "scan") {
      console.log("users popup");
      navigation.navigate("Scanned Popup", {
        userid: data.split("/")[0],
        store: store,
      });
    }
    if (data.split("/")[1] == "redeem") {
      console.log("redeem popup");
      navigation.navigate("Redeem Popup", { cardid: data.split("/")[0] });
    }
    setScanned(false);
  };
  console.log(store);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: store.logo }}
        width={250}
        height={250}
        resizeMode="center"
      />
      <Camera
        style={styles.camera}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={!scanned ? handleBarCodeScanned : null}
      >
        <IonIcons
          name="scan"
          size={350}
          color="white"
          style={styles.cameraicon}
        />
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraicon: {
    zIndex: 2,
  },
  logo: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    opacity: 0.5,
  },
});
