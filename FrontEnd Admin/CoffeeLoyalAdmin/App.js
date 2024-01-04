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
import { app } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScannedPopUp } from "./components/scannedPopup";

const auth = getAuth(app);
const Stack = createNativeStackNavigator();


const TopBanner = {title: "Coffee Loyalty" , headerStyle:{backgroundColor:"#5E3023"},headerTintColor: "#F3E9DC",headerTitleStyle:{fontWeight:'bold',fontSize:30},headerTitleAlign: 'center'}

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
        <Stack.Navigator initialRouteName={"Main Page"} >
          <Stack.Screen
            name="Main Page"
            component={MainScreen}
            options={TopBanner}
          />
          <Stack.Screen
            name="Change Store"
            component={HomeScreen}
            initialParams={{ userToken }}
            options={TopBanner}
          />
          <Stack.Screen name="Scanned Popup" component={ScannedPopUp} options={TopBanner}/>

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
