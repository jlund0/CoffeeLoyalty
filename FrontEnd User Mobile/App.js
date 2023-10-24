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
            <Stack.Screen name="Login" component={SignInScreen} />
            <Stack.Screen name="Register" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerStyle: {
                  opacity: 0,
                  height: 0,
                },
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
                headerStyle: {
                  opacity: 0,
                  height: 0,
                },
                animation: "slide_from_left",
              }}
            />
            <Stack.Screen
              name="settings"
              component={SettingsScreen}
              options={{
                headerStyle: {
                  opacity: 0,
                  height: 0,
                },
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
