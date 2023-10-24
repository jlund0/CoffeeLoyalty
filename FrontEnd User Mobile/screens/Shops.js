import { View, Image, Text, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";
import { useIsFocused } from "@react-navigation/native";

export default function StoresScreen({ navigation, isFocused }) {
  return (
    <View>
      <Text>shop Screen</Text>
      <NavBar navigation={navigation} isFocused={isFocused ? "shop" : null} />
    </View>
  );
}
