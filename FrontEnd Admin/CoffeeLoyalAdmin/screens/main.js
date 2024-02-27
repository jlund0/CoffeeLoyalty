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
  Alert,
} from "react-native";
import { ScannedPopUp } from "../components/scannedPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Camera, CameraType } from "expo-camera";
import BarcodeCamera from "../components/camera";
import { useNavigation } from "@react-navigation/native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { getStore } from "../firebaseFunctions";
export function MainScreen({ navigation }) {
  const [defaultstore, setdefaultStore] = useState();
  const [store, setStore] = useState();
  useEffect(() => {
    const getDefaultStore = async () => {
      console.log("checking Default store");
      try {
        const jsonValue = await AsyncStorage.getItem("default-store");
        jsonValue != null
          ? setdefaultStore(JSON.parse(jsonValue))
          : navigation.navigate("Change Store");
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };
    getDefaultStore();
  }, []);
  console.log(defaultstore);
  useEffect(() => {
    const fetchStore = async () => {
      const storedata = await getStore(defaultstore.id);
      setStore(storedata);
    };

    defaultstore != null && fetchStore();
  }, []);

  if (store == null) {
    return <Text>Getting Store</Text>;
  }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.storeinfoContainer}>
        <Text
          style={styles.storename}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {store.name}
        </Text>

        <Text style={{ fontSize: 25 }}>
          {store.location.split(",")[0]}
          {"\n"}
        </Text>
        <Text
          style={{
            fontSize: 34,
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "white",
          }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          Scan Customers QR
        </Text>
      </View>
      <View style={styles.cameracontainer}>
        <BarcodeCamera
          navigation={navigation}
          // onBarCodeScanned={handleBarCodeScanned}
          store={store}
        />

        {/* <Button
          title={"temp to move on"}
          onPress={() =>
            navigation.navigate("Scanned Popup", {
              userid: "jsRvlL3bb4hE4HOV7hr1bUpWAY32",
              store: store,
            })
          }
        /> */}
      </View>
      <View style={styles.bottomfill}></View>
    </View>
  );
}

const defaults = {};
const styles = StyleSheet.create({
  bottomfill: { flex: 1 },
  coffeeLoyal: {
    fontSize: 30,
    width: "100%",
    backgroundColor: "black",
    color: "white",
    // justifyContent: "center",
    textAlign: "center",
  },
  storeinfoContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    padding: 20,
    paddingBottom: 0,
  },
  maincontainer: {
    flex: 1,
    rowGap: 20,
    justifyContent: "center",
    // alignContent: "center",
    alignItems: "center",
    // padding: 10,
    // paddingTop: "10%",
    backgroundColor: "#d5bbaa",
  },
  cameracontainer: {
    width: "100%",
    flex: 5,
  },
  camera: {
    borderRadius: 20,
  },
  cameraicon: {
    position: "absolute",
    alignSelf: "center",
  },
  logo: { width: 80, height: 80 },
  storename: { fontSize: 56, textTransform: "uppercase", fontWeight: "900" },
});
