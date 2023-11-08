import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Button,
} from "react-native";
import { Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavBar from "../components/NavBar";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import { useState } from "react";
import { CoffeeIconSVG } from "../assets/socialSVG.js";

function UserButton() {
  const [showMenu, setShowMenu] = useState(false);
  const auth = getAuth(app);
  const handleClick = () => {
    console.log("clicked");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
        console.log("sign out error" + error);
      });
  };

  return (
    <>
      <FontAwesome.Button
        name="user-circle"
        backgroundColor="0"
        size={50}
        onPress={() => setShowMenu(!showMenu)}
      ></FontAwesome.Button>
      {showMenu ? (
        <View>
          <Button title="Edit Profile" />
          <Button title="Log Out" onPress={handleClick} />
        </View>
      ) : null}
    </>
  );
}

//TODO fix fetching userDetails to get coffee saved
export default function Home({ navigation }) {
  console.log("Home Page");
  getAuth(app);
  const user = getAuth().currentUser;
  let name = user.displayName.substring(0, user.displayName.indexOf(" "));
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const isFocused = useIsFocused();
  let greetings = ["Hello", "Welcome back", "Hey 👋", "Good Morning"];
  let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  async function getCards() {
    const userDetails = await fetch(`http://localhost:8080/${user.userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return userDetails;
  }

  // const userDetails = getCards();

  return (
    <View style={styles.maincontainer}>
      <View style={styles.greetings}>
        <Text style={{ fontSize: 36, fontWeight: "normal" }}>
          {randomGreeting},{"\n"}
          <Text style={{ fontWeight: "bold" }}>{name}</Text>
        </Text>
        <UserButton />
      </View>
      {/* <CoffeeSaved coffeenumber={userDetails.freeCoffees} /> */}
      <CoffeeSaved coffeenumber={0} />
      <View style={styles.qr}>
        <Image
          source={require("../assets/QR_code_for_mobile_English_Wikipedia.svg")}
          style={{
            height: "100%",
            width: "80%",
            resizeMode: "contain",
            borderRadius: 30,
            borderWidth: 5,
            backgroundColor: "#d3d3d3",
          }}
        />
      </View>
      <NavBar navigation={navigation} isFocused={isFocused ? "main" : null} />
    </View>
  );
}
function CardScreen({ navigation, route }) {
  return (
    <View>
      <Text>card Screen</Text>
      <NavBar
        navigation={navigation}
        isFocused={useIsFocused() ? "card" : null}
      />
    </View>
  );
}

function CoffeeSaved({ coffeenumber }) {
  return (
    <View style={styles.coffeesaved}>
      <Text
        style={{
          fontSize: 25,
          paddingLeft: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Free Coffees
      </Text>
      <View>
        <Image
          source={require("../assets/3dCup.png")}
          style={{
            width: 120,
            height: 120,
            borderWidth: 5,
            borderRadius: 40,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            position: "absolute",
            top: "40%",
            alignSelf: "center",
          }}
        >
          {coffeenumber}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    minHeight: Dimensions.get("window").height,
    maxHeight: Dimensions.get("window").height,
    width: "100%",
    // backgroundColor: "#fff",
    flexDirection: "column",
    rowGap: 50,
    justifyContent: "space-between",
  },
  greetings: {
    flex: 1.25,
    backgroundColor: "#d3d3d3",
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
    backgroundColor: "#d3d3d3",
    borderRadius: 44,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "65%",
    alignSelf: "center",
  },
  qr: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  coffeesaved: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    borderRadius: 44,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "65%",
    alignSelf: "center",
  },
});
