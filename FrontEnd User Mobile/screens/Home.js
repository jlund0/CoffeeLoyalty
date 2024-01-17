import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Button,
  ActivityIndicator,
} from "react-native";
import { Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import { useState, useEffect } from "react";
import { CoffeeIconSVG, Background } from "../assets/socialSVG.js";
import QRCode from "react-native-qrcode-svg";
import { useFonts, TitanOne_400Regular } from "@expo-google-fonts/titan-one";
import { getUserInfo } from "../firebasefunctions.js";
import { UserButton } from "../components/buttons.js";
import { CupTop } from "../assets/socialSVG.js";

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("../assets/3dCup.png")} width={50} height={50} />
      <Text>Roasting Coffee...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
export default function Home({ navigation }) {
  console.log("Home Page");
  const [userDetails, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  let greetings = ["Hello", "Welcome back", "Hey 👋", "Good Morning"];
  let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  let [fontsLoaded] = useFonts({
    TitanOne_400Regular,
  });

  useEffect(() => {
    async function fetchFirebaseInfo() {
      if (userDetails === null) {
        // const usercards = await getUserCards();
        // setUserCards(usercards);
        console.log("getting user info");
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
        setLoading(false);
      }
    }
    fetchFirebaseInfo();
  }, [userDetails]);

  if (!fontsLoaded) {
    return null;
  }
  const getName = () => {
    console.log("userDetails");
    console.log(userDetails);
    let name = userDetails.name.substring(0, userDetails.name.indexOf(" "));
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name;
  };
  if (loading) {
    return <SplashScreen />;
  }
  return (
    <View style={styles.maincontainer}>
      {/* <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        style={styles.image}
      > */}
      <View style={[styles.greetings]}>
        <Text
          style={{
            fontSize: 30,

            fontFamily: "TitanOne_400Regular",
          }}
        >
          {randomGreeting},{"\n"}
          <Text style={{ fontWeight: "bold", fontSize: 40 }}>{getName()}</Text>
        </Text>
        <UserButton />
      </View>
      {/* <CoffeeSaved coffeenumber={userDetails.freeCoffees} /> */}
      {/* <CoffeeSaved coffeenumber={userDetails.coffee_earnt} /> */}
      <View style={[styles.qr]}>
        <Text style={{ fontSize: 40 }}>Scan Here</Text>
        <View
          style={{ backgroundColor: "#eaded6", padding: 20, borderRadius: 20 }}
        >
          <QRCode
            value={userDetails.userId}
            size={340}
            backgroundColor={"transparent"}
            logo={require("../assets/coffeeGuy.png")}
            logoSize={150}
          />
        </View>
      </View>
      <NavBar navigation={navigation} isFocused={isFocused ? "main" : null} />
      {/* </ImageBackground> */}
    </View>
  );
}

function CoffeeSaved({ coffeenumber }) {
  return (
    <View style={[styles.coffeesaved]}>
      <Text
        style={{
          fontSize: 35,
          paddingLeft: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Free Coffees
      </Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <CupTop width={90} height={90}></CupTop>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            position: "absolute",
            right: "42%",
            color: "#eaded6",
          }}
        >
          {coffeenumber}
        </Text>
      </View>
    </View>
  );
}
const colors = {
  bg: "#fff8e7",
  widgetbg: "rgba(205, 184, 145, 0.90))",
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    minHeight: Dimensions.get("window").height,
    maxHeight: Dimensions.get("window").height,
    width: "100%",
    flexDirection: "column",
    rowGap: 50,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  maincontainer: {
    // minHeight: Dimensions.get("window").height,
    // maxHeight: Dimensions.get("window").height,
    flex: 1,
    width: "100%",
    // backgroundColor: "#fff",
    flexDirection: "column",
    rowGap: 30,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#936748",
  },
  greetings: {
    flex: 1.25,
    backgroundColor: colors.widgetbg,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 40,
  },
  coffeesaved: {
    flex: 1,
    backgroundColor: colors.widgetbg,
    borderRadius: 44,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "65%",
    alignSelf: "center",
  },
  qr: {
    flex: 5,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    rowGap: 20,
    backgroundColor: colors.widgetbg,
    padding: 20,
  },
  coffeesaved: {
    flex: 1.5,
    backgroundColor: colors.widgetbg,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "65%",
    alignSelf: "center",
    padding: 10,
  },
});
