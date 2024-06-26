import { View, Image, Text, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import {
  BlackCoffeeCardIconSVG,
  CoffeeCardIconSVG,
  ColoredCoffeeCardIconSVG,
  ColoredHome,
} from "../assets/socialSVG.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function NavBar({ navigation, isFocused, cards }) {
  return (
    <View style={[styles.navbar]}>
      <Pressable
        onPress={
          isFocused == "card"
            ? null
            : () => navigation.navigate("card", { cards })
        }
        style={[styles.navIconContainer, isFocused == "card" && styles.active]}
      >
        <MaterialCommunityIcons
          name="wallet"
          size={55}
          style={[styles.navIcon]}
        />
      </Pressable>
      <Pressable
        onPress={isFocused == "main" ? null : () => navigation.navigate("Home")}
        style={[styles.navIconContainer, isFocused == "main" && styles.active]}
      >
        <FontAwesome5
          name="home"
          size={50}
          style={styles.navIcon}
        ></FontAwesome5>
      </Pressable>
      <Pressable
        onPress={isFocused == "map" ? null : () => navigation.navigate("map")}
        style={[styles.navIconContainer, isFocused == "map" && styles.active]}
      >
        <FontAwesome5 name="map-marked-alt" size={45} style={styles.navIcon} />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "rgb(205, 184, 145))",
    height: 75,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "85%",
    borderRadius: 20,
    marginBottom: 30,
    alignSelf: "center",
    overflow: "visible",
    // flex: 1,
  },
  active: {
    backgroundColor: "#eaded6",
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: 10,
    color: "#2b1e15",
    flex: 1,
    paddingHorizontal: 20,
  },
  navIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 20,
    height: "100%",
    // paddingHorizontal: 20,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 5, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
