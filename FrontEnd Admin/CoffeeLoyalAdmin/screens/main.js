
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, CameraType } from 'expo-camera';

import {useNavigation} from '@react-navigation/native';

export const useFocus = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [focusCount, setFocusCount] = useState(0);
  const isFirstTime = focusCount === 1;

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      setIsFocused(true);
      setFocusCount(prev => prev + 1);
    });
    const unsubscribeBlur = navigation.addListener('blur', () => {
      setIsFocused(false);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  });

  return {isFocused, isFirstTime, focusCount};
};

export function MainScreen({ navigation, route }) {
  // const store= route.params;
  const [store, setStore] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  // const [scannedUser, setScannedUser] = useState(null);
  const {focusCount, isFocused} = useFocus();
  // const [temp, setTemp] = useState(false);


useEffect(() => {
    if (focusCount > 1 && isFocused) {
        // trigger when you navigate back from another screen
        // you can background reload data here ...
        setScanned(false)
    }
});



  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // setScannedUser(data);
    // console.log(
    //   `Bar code with type ${type} and data ${data} has been scanned!`
    // );
    
    navigation.navigate("Scanned Popup", { userid:data, store:store });
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
        {/* <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        /> */}
         <Camera style={styles.camera} barCodeScannerSettings={{
    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr ],

  // }} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
}} onBarCodeScanned={()=> handleBarCodeScanned}
  ></Camera>
        {/* <Button title={"temp to move on"} onPress={() => setTemp(true)} /> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
