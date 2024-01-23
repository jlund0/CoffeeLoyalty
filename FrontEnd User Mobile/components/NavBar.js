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
export default function NavBar({ navigation, isFocused }) {
  return (
    <View style={[styles.navbar]}>
      <Pressable
        onPress={isFocused == "card" ? null : () => navigation.navigate("card")}
        style={[styles.navIconContainer, isFocused == "card" && styles.active]}
      >
        <MaterialCommunityIcons
          name="card-multiple"
          size={60}
          style={[styles.navIcon, { transform: "scaleY(-1)" }]}
        />
        {/* {isFocused == "card" ? (
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
    )} */}
      </Pressable>
      <Pressable
        onPress={isFocused == "main" ? null : () => navigation.navigate("Home")}
        style={[styles.navIconContainer, isFocused == "main" && styles.active]}
      >
        <FontAwesome5
          name="home"
          size={60}
          style={styles.navIcon}
        ></FontAwesome5>
        {/* {isFocused == "main" ? (
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
        )} */}
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
        onPress={isFocused == "map" ? null : () => navigation.navigate("map")}
        style={[styles.navIconContainer, isFocused == "map" && styles.active]}
      >
        <FontAwesome5 name="map-marked-alt" size={60} style={styles.navIcon} />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "rgba(205, 184, 145, 0.90))",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    borderRadius: 20,
    marginBottom: 30,
    alignSelf: "center",
    overflow: "visible",
    flex: 1,
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
    backgroundColor: "0",
    color: "#2b1e15",
    fontSize: "250%",
    flex: 1,
  },
  navIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 20,
    height: "100%",
    paddingHorizontal: 20,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 5, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
