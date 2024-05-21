import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/changeStore";
import { AdminSignInScreen } from "./screens/adminSignIn";
import { EmployeeSignInScreen } from "./screens/employeeSignIn";
import { MainScreen } from "./screens/main";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, auth } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScannedPopUp } from "./components/scannedPopup";
import { SuccessScreen } from "./screens/success";
import { useFonts } from "expo-font";
import { RedeemPopup } from "./screens/redeemPopup";

const Stack = createNativeStackNavigator();

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Checking Login...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default function App() {
  const [userToken, setUserToken] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [fontsLoaded, fontError] = useFonts({
    "Lobster-Regular": require("./assets/fonts/Lobster-Regular.ttf"),
  });

  const TopBanner = {
    title: "CupCount",
    headerStyle: { backgroundColor: "#5E3023" },
    headerTintColor: "#F3E9DC",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 40,
      fontFamily: "Lobster-Regular",
    },
    headerTitleAlign: "center",
    headerBackTitleVisible: false,
    headerLargeStyle: true,
    animation: "none",
    headerBackVisible: false,
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserToken(user.uid);
      setLoading(false);
    } else {
      setUserToken(null);
      setLoading(false);
    }
  });

  if (loading) {
    // We haven't finished checking for the token yet
    console.log("loading");
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {userToken ? (
        <Stack.Navigator initialRouteName={"Change Store"}>
          <Stack.Screen
            name="Change Store"
            component={HomeScreen}
            initialParams={{ userToken }}
            options={TopBanner}
          />
          <Stack.Screen
            name="Main Page"
            component={MainScreen}
            options={TopBanner}
            initialParams={{ userToken }}
          />

          <Stack.Screen
            name="Scanned Popup"
            component={ScannedPopUp}
            options={TopBanner}
          />
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={TopBanner}
          />
          <Stack.Screen
            name="redeem Popup"
            component={RedeemPopup}
            options={TopBanner}
          />
          {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Admin Store Sign In">
          <Stack.Screen
            name="Admin Store Sign In"
            component={AdminSignInScreen}
          />
          <Stack.Screen
            name="Employee Sign In"
            component={EmployeeSignInScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  coffeeLoyal: {
    fontSize: 30,
    width: "100%",
    backgroundColor: "black",
    color: "white",
    // justifyContent: "center",
    textAlign: "center",
  },
});
