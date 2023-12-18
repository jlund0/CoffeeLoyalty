import { Camera, CameraType } from "expo-camera";
import { enableNetwork } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { ScannedPopUp } from "../components/scannedPopup";

export function StoreScreen({ navigation, route }) {
  const store = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedUser, setScannedUser] = useState(null);

  const [temp, setTemp] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedUser(data);

    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
  };

  if (hasPermission === null) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Waiting for Camera Permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>{store.name}</Text>
      <Image source={{ uri: store.logo }} />
      <Text>Scan Customers QR</Text>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
        <Button title={"temp to move on"} onPress={() => setTemp(true)} />
        {scanned && (
          <>
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
            <ScannedPopUp
              userid={scannedUser}
              storeid={store.id}
              stampsRequired={store.coffee_required}
            />
          </>
        )}
        {temp && (
          <ScannedPopUp userid={"jsRvlL3bb4hE4HOV7hr1bUpWAY32"} store={store} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
