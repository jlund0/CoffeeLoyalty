import { View } from "react-native";
import NavBar from "../components/NavBar";
// import { PROVIDER_GOOGLE } from "react-native-maps";
// import { MapView } from "react-native-maps";
export function MapScreen({ navigation }) {
  return (
    <View>
      {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}

      <NavBar navigation={navigation} isFocused={"map"} />
    </View>
  );
}
