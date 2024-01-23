import { StyleSheet, View, ActivityIndicator, Text, Image } from "react-native";

import * as React from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { app, signOut } from "./firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//SCREENS
import Home from "./screens/Home";
import CardScreen from "./screens/Card";
import StoresScreen from "./screens/Shops";
import SettingsScreen from "./screens/Settings";
import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";
import LoyaltyCard from "./screens/loyaltyCard";
import { getUserInfo, getUserCards } from "./firebasefunctions";
import { MapScreen } from "./screens/maps.js";

const Stack = createNativeStackNavigator();
const auth = getAuth(app);

const TopBanner = {
  title: "CupCount",
  headerStyle: { backgroundColor: "#5E3023" },
  headerTintColor: "#F3E9DC",
  headerTitleStyle: { fontWeight: "bold", fontSize: 40 },
  headerTitleAlign: "center",
  headerBackTitleVisible: false,
  headerLargeStyle: true,
};

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("./assets/3dCup.png")} width={50} height={50} />
      <Text>Roasting Coffee...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function App() {
  const [userToken, setUserToken] = React.useState(null);
  // const [userInfo, setUserInfo] = React.useState(null);
  // const [userCards, setUserCards] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  // React.useEffect(() => {
  //   console.log("checking user auth");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      setLoading(false);

      setUserToken(user.uid);
    } else {
      setUserToken(null);
      setLoading(false);
    }
  });
  // }, []);

  if (loading) {
    // We haven't finished checking for the token yet
    console.log("loading");
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {userToken == null ? (
          <>
            <Stack.Screen
              name="Login"
              component={SignInScreen}
              options={TopBanner}
            />
            <Stack.Screen
              name="Register"
              component={SignUpScreen}
              options={TopBanner}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={TopBanner}
              initialParams={{ userid: userToken }}
            />
            <Stack.Screen
              name="card"
              component={CardScreen}
              options={TopBanner}
              // initialParams={userCards}
            />
            {/* <Stack.Screen
              name="stores"
              component={StoresScreen}
              options={{
            TopBanner,                animation: "slide_from_left",
              }}
            /> */}
            <Stack.Screen
              name="settings"
              component={SettingsScreen}
              options={TopBanner}
            />
            <Stack.Screen
              name="loyaltyCard"
              component={LoyaltyCard}
              options={TopBanner}
            />
            <Stack.Screen
              name="map"
              component={MapScreen}
              options={TopBanner}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 18,
  },
  icon: {
    width: 40,
    height: 40,
  },

  button: {
    borderRadius: 50,
    backgroundColor: "0",
    borderWidth: 2,
    justifyContent: "center",
    alignSelf: "center",
  },
});
