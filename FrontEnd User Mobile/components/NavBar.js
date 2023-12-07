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

export default function NavBar({ navigation, isFocused }) {
  return (
    <View style={[styles.navbar, styles.shadowProp]}>
      <Pressable
        onPress={isFocused == "main" ? null : () => navigation.navigate("Home")}
        style={styles.navIconContainer}
      >
        {isFocused == "main" ? (
          <ColoredHome style={styles.navIcon} width={80} height={80} />
        ) : (
          <MaterialIcons
            name="home"
            onPress={() => navigation.navigate("Home")}
            backgroundColor="0"
            color={"black"}
            style={{ backgroundColor: "0" }}
            size={80}
          />
        )}
      </Pressable>
      {/* <MaterialCommunityIcons.Button
        name="card-multiple-outline"
        onPress={() => navigation.navigate("card")}
        size={isFocused == "card" ? 70 : 50}
        backgroundColor="0"
        color={isFocused == "card" ? "black" : "white"}
        style={styles.navIcon}
      /> */}
      <Pressable
        onPress={isFocused == "card" ? null : () => navigation.navigate("card")}
        style={styles.navIconContainer}
      >
        {isFocused == "card" ? (
          <ColoredCoffeeCardIconSVG
            fill="currentColor"
            style={styles.navIcon}
            width={80}
            height={80}
          />
        ) : (
          <BlackCoffeeCardIconSVG
            width={80}
            height={80}
            fill="currentColor"
            style={styles.navIcon}
          />
        )}
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "rgba(205, 184, 145, 0.90))",
    height: "auto",
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
    margin: 10,
    backgroundColor: "0",
  },
  navIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 5, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
