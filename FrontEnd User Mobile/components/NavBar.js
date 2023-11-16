import { View, Image, Text, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import { CoffeeIconSVG } from "../assets/socialSVG.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function NavBar({ navigation, isFocused }) {
  return (
    <View style={styles.navbar}>
      <MaterialCommunityIcons.Button
        name="card-multiple-outline"
        onPress={() => navigation.navigate("card")}
        size={isFocused == "card" ? 70 : 50}
        backgroundColor="0"
        color={isFocused == "card" ? "black" : "white"}
        style={styles.navIcon}
      />

      <MaterialIcons.Button
        name="qr-code"
        onPress={() => navigation.navigate("Home")}
        backgroundColor="0"
        color={isFocused == "main" ? "black" : "white"}
        style={
          isFocused == "main" ? styles.activeNav : { backgroundColor: "0" }
        }
        size={isFocused == "main" ? 70 : 50}
      />

      <MaterialIcons.Button
        name="storefront"
        onPress={() => navigation.navigate("stores")}
        backgroundColor="0"
        size={isFocused == "shop" ? 70 : 50}
        color={isFocused == "shop" ? "black" : "white"}
        style={
          isFocused == "shop" ? styles.activeNav : { backgroundColor: "0" }
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#d3d3d3",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // marginTop: 40,
    // borderRadius: 40,
    // margin: 10,
    // borderWidth: 4,
    borderBottomWidth: 0,
    alignSelf: "flex-end",
    overflow: "visible",
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
