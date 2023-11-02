import { View, Image, Text, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

export default function NavBar({ navigation, isFocused }) {
  return (
    <View style={styles.navbar}>
      <Pressable
        style={
          isFocused == "card" ? [styles.activeNav , styles.navIcon]: { backgroundColor: "0" }
        }
        onPress={() => navigation.navigate("card")}
      >
        <Image
          source={require("../assets/card_icon.png")}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            backgroundColor: "0",
          }}
        ></Image>
      </Pressable>

      <MaterialIcons.Button
        name="qr-code"
        onPress={() => navigation.navigate("Home")}
        backgroundColor="0"
        style={
          isFocused == "main"
            ? [styles.activeNav, styles.navIcon]
            : styles.navIcon
        }
        size={50}
      />

      <MaterialIcons.Button
        name="storefront"
        onPress={() => navigation.navigate("stores")}
        backgroundColor="0"
        size={50}
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
    height:"10%",
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
  activeNav: {
    borderRadius: 30,
    borderWidth: 5,
    backgroundColor: "brown",
    padding: 5,
    textAlign: "center",
  },
  navIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});
