import { useEffect, useState } from "react";
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
export function MainScreen({ route, navigation }) {
  const store = route.params;
  console.log("main page");
  console.log(store);
  const [defaultstore, setdefaultStore] = useState();
  const [currentStore, setStore] = useState(store);

  // const fetchstoreupdates = async (id) => {
  //   const storedata = await getStore(id);
  //   setStore(storedata);
  // };

  // useEffect(() => {
  //   const getDefaultStore = async () => {
  //     console.log("checking Default currentStore");
  //     try {
  //       const jsonValue = await AsyncStorage.getItem("default-currentStore");
  //       jsonValue != null
  //         ? fetchstoreupdates(JSON.parse(jsonValue).id)
  //         : navigation.navigate("Change currentStore");
  //     } catch (e) {
  //       // error reading value
  //       console.log(e);
  //     }
  //   };
  //   if (!store) getDefaultStore();
  // }, []);

  if (currentStore == null) {
    return <Text>Getting current store</Text>;
  }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.storeinfoContainer}>
        <Text
          style={styles.storename}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {currentStore.name}
        </Text>

        <Text style={{ fontSize: 25 }}>
          {currentStore.location.split(",")[0]}
        </Text>
        <Text
          style={{
            fontSize: 30,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          Scan Customers QR
        </Text>
      </View>
      <View style={styles.cameracontainer}>
        <BarcodeCamera navigation={navigation} store={currentStore} />
      </View>
    </View>
  );
}

const defaults = {};
const styles = StyleSheet.create({
  coffeeLoyal: {
    fontSize: 30,
    width: "100%",
    backgroundColor: "black",
    color: "white",
    // justifyContent: "center",
    textAlign: "center",
  },
  storeinfoContainer: {
    // height: "30%",

    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    padding: 20,
    position: "absolute",
    zIndex: 2,
    backgroundColor: "white",
    top: 40,
    borderRadius: 3,
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
    flex: 1,
  },
  camera: {
    borderRadius: 20,
  },
  cameraicon: {
    position: "absolute",
    alignSelf: "center",
  },
  logo: { width: 80, height: 80 },
  storename: { fontSize: 38, textTransform: "uppercase", fontWeight: "900" },
});
