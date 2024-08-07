import { StyleSheet, View, ActivityIndicator, Text, Image, FlatListComponent } from "react-native";
import { useEffect, useState, useRef } from "react";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { app, signOut, auth } from "./firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//SCREENS
import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";
import Main from "./screens/Main.js";
import { useFonts } from "expo-font";
import { registerForPushNotificationsAsync } from "./notifications.js";
import * as Notifications from "expo-notifications";
import { UserButton } from "./components/buttons.js";
// import SplashPage from "./AuthScreen/SplashPage.js";
import { SplashPage } from "./AuthScreen/SplashPage.js";
import { UserDetailsPage } from "./components/userDetails.js";
import { StampPage } from "./AuthScreen/StampCardPape.js";
const Stack = createNativeStackNavigator();

//Workaround
// window.navigator.userAgent = "ReactNative";

// const auth = getAuth(app);

const defaultcard = {
  active: true,
  cardId: "2aL9rKAb7VZAoKvBTpLI",
  coffeeId: "Starbucks_test",
  coffeesEarnt: 6,
  coffees_required: 6,
  completed: true,
  coords: ["31.94957336300768° S", "115.8618892559894° E"],
  geohash: "qd66hxb01",
  location: "Perth Cultural Centre, Perth WA 6000",
  logo: "https://firebasestorage.googleapis.com/v0/b/loyal-coffee-bad9d.appspot.com/o/STORES%2FLogos%2FStarbucks_test.png?alt=media&token=7787804c-203c-45f9-97c5-4846f153a08b",
  name: "Starbucks",
  owner: "XXsfIYJK2qOsWVGvffL82MQaT5J3",
  redeemed: false,
  storeId: "Starbucks_test",
  userId: "IEsXtFRgdOeMSgY0BRiXycWMJ2K2",
  terms: "Only purchases over $3 will count toward a card"

}
const defaultuser = {
  coffee_earnt: 0,
  created_at: { nanoseconds: 265000000, seconds: 1706514029 },
  email: "test@test.com",
  name: "User",
  role: "customer",
  userId: "IEsXtFRgdOeMSgY0BRiXycWMJ2K2",
}


export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasDisplayName, setHasDisplayName] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  function CustomHeader({ navigation }) {
    return (
      <View
        style={{
          justifyContent: "space-between",
          width: "100%",
          // height: 100,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          paddingRight: 30,
        }}
      >
        <Image
          source={require("./assets/logo.png")}
          style={{
            height: 80,
            width: 80,
            // aspectRatio: 1,
            resizeMode: "center",
            borderWidth: 3,
          }}
        />
        <UserButton navigation={navigation} />
      </View>
    );
  }

  const TopBanner = {
    title: "CupCount",
    headerStyle: { backgroundColor: "#5E3023" },
    headerTintColor: "#F3E9DC",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 36,
    },
    headerTitleAlign: "center",
    headerBackTitleVisible: false,
    headerLargeStyle: true,
    animation: "none",
    headerBackVisible: false,
  };

  const TopBannerLoyaltyCard = {
    title: "CupCount",
    headerStyle: { backgroundColor: "#5E3023" },
    headerTintColor: "#F3E9DC",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 36,
      fontFamily: "Lobster-Regular",
    },
    headerTitleAlign: "center",
    headerBackTitleVisible: false,
    headerLargeStyle: true,
    animation: "none",
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
      setUserToken(user.uid);
      if (user.displayName !== null) {
        setHasDisplayName(true);
      }
    } else {
      setUserToken(null);
      setLoading(false);
    }
  });
  // }, []);

  if (loading) {
    // We haven't finished checking for the token yet
    console.log("loading");
    return <SplashPage message={"Logging you in"} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Navigator initialRouteName="notifcation"> */}
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
            {/* <Stack.Screen name="notifcation" component={NotificationPage} /> */}
          </>
        ) : (
          <>

            <Stack.Screen
              name="Main"
              component={Main}
              // options={({ navigation }) => ({
              //   headerTitle: (props) => (
              //     <CustomHeader {...props} navigation={navigation} />
              //   ),
              // })}
              options={{ headerShown: false }}

            />
            <Stack.Screen name="userDetails" component={UserDetailsPage} />
            <Stack.Screen options={{ headerTitle: '', headerTransparent: true, headerBackTitleVisible: false, headerLargeTitleShadowVisible: false, headerTintColor: '#white', headerTitleStyle: { fontSize: 38 } }} name="stamppage" component={StampPage} initialParams={{ card: defaultcard, user: defaultuser }} />
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
