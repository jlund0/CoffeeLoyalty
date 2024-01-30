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

// export const useFocus = () => {
//   const navigation = useNavigation();
//   const [isFocused, setIsFocused] = useState(false);
//   const [focusCount, setFocusCount] = useState(0);
//   const isFirstTime = focusCount === 1;

//   useEffect(() => {
//     const unsubscribeFocus = navigation.addListener("focus", () => {
//       setIsFocused(true);
//       setFocusCount((prev) => prev + 1);
//     });
//     const unsubscribeBlur = navigation.addListener("blur", () => {
//       setIsFocused(false);
//     });

//     return () => {
//       unsubscribeFocus();
//       unsubscribeBlur();
//     };
//   });

//   return { isFocused, isFirstTime, focusCount };
// };

export function MainScreen({ navigation, route }) {
  // const store= route.params;
  const [store, setStore] = useState();
  // const [hasPermission, setHasPermission] = useState(null);
  // const [scanned, setScanned] = useState(false);
  // const [scannedUser, setScannedUser] = useState(null);
  const { focusCount, isFocused } = useFocus();
  // const [temp, setTemp] = useState(false);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // useEffect(() => {
  //   if (focusCount > 1 && isFocused) {
  //     // trigger when you navigate back from another screen
  //     // you can background reload data here ...
  //     // setScanned(false);
  //   }
  // });

  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await Camera.getCameraPermissionsAsync();
  //     if (status !== "granted") {
  //       Camera.requestCameraPermissionsAsync();
  //     }
  //     setHasPermission(status === "granted");
  //   };
  //   getBarCodeScannerPermissions();
  // }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // setScanned(true);
    navigation.navigate("Scanned Popup", { userid: data, store: store });
  };

  useEffect(() => {
    const getDefaultStore = async () => {
      console.log("checking Default store");
      try {
        const jsonValue = await AsyncStorage.getItem("default-store");
        jsonValue != null
          ? setStore(JSON.parse(jsonValue))
          : navigation.navigate("Change Store");
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };
    getDefaultStore();
  }, []);

  if (store == null) {
    return <Text>Getting Store</Text>;
  }

  // if (hasPermission === null) {
  //   return (
  //     <View>
  //       <ActivityIndicator />
  //       <Text>Waiting for Camera Permission</Text>
  //     </View>
  //   );
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.storeinfoContainer}>
        <Text style={styles.storename}>{store.name}</Text>
        <Image style={styles.logo} source={{ uri: store.logo }} />
      </View>
      <Text style={{ fontSize: 30 }}>{store.location}</Text>
      <Text style={{ fontSize: 24 }}>Scan Customers QR</Text>
      <View style={styles.cameracontainer}>
        <BarcodeCamera
          navigation={navigation}
          onBarCodeScanned={handleBarCodeScanned}
        />
        {/* <IonIcons
          name="scan"
          size={300}
          color="white"
          style={styles.cameraicon}
        /> */}
        <Button
          title={"temp to move on"}
          onPress={() =>
            navigation.navigate("Scanned Popup", {
              userid: "jsRvlL3bb4hE4HOV7hr1bUpWAY32",
              store: store,
            })
          }
        />
        {/* {scanned && (
          <>
            <Button
              title={"Tap to Scan Again"}
              onPress={() => setScanned(false)}
            />
            <ScannedPopUp
              userid={scannedUser}
              storeid={store.id}
              stampsRequired={store.coffee_required}
              navigation={navigation}
            />
          </>
        )}
        {temp && (
          <ScannedPopUp userid={"jsRvlL3bb4hE4HOV7hr1bUpWAY32"} store={store} />
        )} */}
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
    flex: 1,
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
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
  storename: { fontSize: 56, textTransform: "capitalize" },
});
