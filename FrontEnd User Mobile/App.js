import { StyleSheet, View, ActivityIndicator, Text, Image } from "react-native";

import * as React from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { app } from "./firebase.js";
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

const Stack = createNativeStackNavigator();
const auth = getAuth(app);

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
  const [userInfo, setUserInfo] = React.useState(null);
  const [userCards, setUserCards] = React.useState(null);

  React.useEffect(() => {
    console.log("checking user auth");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserToken(user.uid);
        console.log(user);
      } else setUserToken(null);
    });
  }, []);
  React.useEffect(() => {
    async function fetchFirebaseInfo() {
      if (userToken !== null) {
        const usercards = await getUserCards();
        setUserCards(usercards);
        const userinfo = await getUserInfo();
        setUserInfo(userinfo);
      }
    }
    fetchFirebaseInfo();
  }, [userToken]);

  if (userInfo === null) {
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
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={SignUpScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
                animation: "slide_from_left",
              }}
              initialParams={userInfo}
            />
            <Stack.Screen
              name="card"
              component={CardScreen}
              options={{
                headerStyle: {},
                headerShown: false,
                animation: "slide_from_left",
              }}
              initialParams={userCards}
            />
            <Stack.Screen
              name="stores"
              component={StoresScreen}
              options={{
                headerShown: false,
                animation: "slide_from_left",
              }}
            />
            <Stack.Screen
              name="settings"
              component={SettingsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="loyaltyCard"
              component={LoyaltyCard}
              options={{
                headerShown: false,
              }}
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
