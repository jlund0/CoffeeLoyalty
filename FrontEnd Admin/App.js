import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/home";
import { AdminSignInScreen } from "./screens/adminSignIn";
import { EmployeeSignInScreen } from "./screens/employeeSignIn";
import { StatPage } from "./screens/stats";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setSignIn] = React.useState(false);
  return (
    <NavigationContainer initialRouteName="Home">
      {isSignedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Stats" component={StatPage} />
          {/* <Stack.Screen name="Settings" component={Settings} /> */}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Admin SignIn">
          <Stack.Screen name="Admin SignIn" component={AdminSignInScreen} />
          <Stack.Screen
            name="Employee SignIn"
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
});
