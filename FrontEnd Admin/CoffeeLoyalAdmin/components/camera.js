import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";

import IonIcons from "react-native-vector-icons/Ionicons";
import { RedeemCard, getStoreLogoUrl } from "../firebaseFunctions";
import { RedeemPopup } from "../screens/redeemPopup";

export default function BarcodeCamera({ navigation, store }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
  navigation.addListener("focus", () => {
    setScanned(false);
  });

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("qr Scanned");
    console.log(data);
    let dataSplit = data.split("/");
    if (dataSplit[1] == "scan") {
      console.log("users popup");
      console.log(dataSplit[0]);
      navigation.navigate("Scanned Popup", {
        userid: dataSplit[0],
        store: store,
      });
    }
    if (dataSplit[2] == "redeem") {
      console.log("redeem popup");
      navigation.navigate("redeem Popup", {
        userId: dataSplit[0],
        cardId: dataSplit[1],
        points_required: store.coffees_required,
        store_Id: store.storeId,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ zIndex: 2, position: "absolute", alignSelf: "center" }}>
        <Image
          style={styles.logo}
          source={{ uri: store.logo }}
          width={250}
          height={250}
          resizeMode="center"
          placeholder={<ActivityIndicator />}
        />
      </View>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={!scanned ? handleBarCodeScanned : null}
      >
        <IonIcons
          name="scan"
          size={350}
          color="white"
          style={styles.cameraicon}
        />
      </CameraView>
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
    zIndex: 3,
  },
  logo: {
    zIndex: 3,
    alignSelf: "center",
    opacity: 0.5,
  },
});
