import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

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

const Stack = createNativeStackNavigator();

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Getting token...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const auth = getAuth(app);
  testApi();
  async function testApi() {
    console.log("testing API....");
    const response = await fetch("http://localhost:8080/", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserToken(user.uid);
      console.log("user " + userToken + " signed in");
      console.log(user);
      setIsLoading(false);
      return true;
    } else {
      console.log("no user signed in");
      setUserToken(null);
      setIsLoading(false);

      return false;
    }
  });
  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/*        */}
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
            />
            <Stack.Screen
              name="card"
              component={CardScreen}
              options={{
                headerStyle: {},
                animation: "slide_from_left",
              }}
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
