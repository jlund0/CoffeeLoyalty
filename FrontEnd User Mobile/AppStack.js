import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import CardScreen from "./screens/Card";
import StoresScreen from "./screens/Shops";
import SettingsScreen from "./screens/Settings";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
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
  );
}
