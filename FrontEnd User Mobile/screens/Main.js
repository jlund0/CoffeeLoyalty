import { useEffect, useState } from "react";
import { Tab, Text, TabView, Button } from "@rneui/themed";
import CardScreen from "../AuthScreen/CardPage";
import HomeScreen from "../AuthScreen/HomePage";
import { getUserInfo, getCards } from "../firestoreFunctions";
import MapPage from "../AuthScreen/MapPage";
import * as Location from "expo-location";
import { sortListbyDistance } from "../useful-functions";
import { SplashPage } from "../AuthScreen/SplashPage";

export default function Main({ navigation }) {
  const [index, setIndex] = useState(1);
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [reload, setReload] = useState(false);

  // const [user, setUser] = useState({
  //   coffee_earnt: 0,
  //   created_at: { nanoseconds: 265000000, seconds: 1706514029 },
  //   email: "test@test.com",
  //   name: "User",
  //   role: "customer",
  //   userId: "IEsXtFRgdOeMSgY0BRiXycWMJ2K2",
  // });
  // const [cards, setCards] = useState([
  //   {
  //     active: true,
  //     cardId: "2aL9rKAb7VZAoKvBTpLI",
  //     coffeeId: "Starbucks_test",
  //     coffeesEarnt: 6,
  //     coffees_required: 6,
  //     completed: true,
  //     coords: ["31.94957336300768° S", "115.8618892559894° E"],
  //     geohash: "qd66hxb01",
  //     location: "Perth Cultural Centre, Perth WA 6000",
  //     logo: "https://firebasestorage.googleapis.com/v0/b/loyal-coffee-bad9d.appspot.com/o/STORES%2FLogos%2FStarbucks_test.png?alt=media&token=7787804c-203c-45f9-97c5-4846f153a08b",
  //     name: "Starbucks",
  //     owner: "XXsfIYJK2qOsWVGvffL82MQaT5J3",
  //     redeemed: false,
  //     storeId: "Starbucks_test",
  //     userId: "IEsXtFRgdOeMSgY0BRiXycWMJ2K2",
  //   },
  //   {
  //     active: true,
  //     cardId: "TfrPLEQJgcnnmXpObqrj",
  //     coffeeId: "seGkfKcY739bYE6zWknO",
  //     coffeesEarnt: 10,
  //     coffees_required: 10,
  //     completed: true,
  //     coords: ["31.958897845256022° S", "115.85825858788468° E"],
  //     geohash: "qd66hrr8w1",
  //     location: "Barrack Square, Riverside Dr, Perth WA 6000",
  //     logo: "https://firebasestorage.googleapis.com/v0/b/loyal-coffee-bad9d.appspot.com/o/STORES%2FLogos%2FseGkfKcY739bYE6zWknO.jpg?alt=media&token=25b04f40-b701-431d-81ce-55bae1070a04",
  //     name: "The Bell Tower",
  //     owner: "XXsfIYJK2qOsWVGvffL82MQaT5J3",
  //     redeemed: false,
  //     storeId: "seGkfKcY739bYE6zWknO",
  //     userId: "IEsXtFRgdOeMSgY0BRiXycWMJ2K2",
  //   },
  //   {
  //     active: true,
  //     cardId: "vJHW0XUwGfhQDNGQqdUC",
  //     coffeeId: "seGkfKcY739bYE6zWknO",
  //     coffeesEarnt: 0,
  //     coffees_required: 10,
  //     completed: false,
  //     coords: ["31.950433033721932° S", "115.85893457057465° E"],
  //     geohash: "qd66hrr8w1",
  //     location: "Barrack Square, Riverside Dr, Perth WA 6000",
  //     logo: "https://firebasestorage.googleapis.com/v0/b/loyal-coffee-bad9d.appspot.com/o/STORES%2FLogos%2FseGkfKcY739bYE6zWknO.jpg?alt=media&token=25b04f40-b701-431d-81ce-55bae1070a04",
  //     name: "The Bell Tower",
  //     owner: "XXsfIYJK2qOsWVGvffL82MQaT5J3",
  //     redeemed: false,
  //     storeId: "seGkfKcY739bYE6zWknO",
  //     userId: "IEsXtFRgdOeMSgY0BRiXycWMJ2K2",
  //   },
  // ]);

  useEffect(() => {
    const getLocation = async () => {
      console.log("getting location");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      console.log("got location");
      setLocation(coords);
      return;
    };
    if (!location) getLocation();

    const fetchUser = async () => {
      let { userdata, cardsdata } = await getUserInfo();
      // let cards = sortListbyDistance(cardsdata, location);
      setUser(userdata);
      setCards(cardsdata);
      return;
    };
    if (!user || !location) fetchUser();
  }, []);

  if (!location || !user || !cards) {
    let message = "Loading";

    if (!location) message = "fetching current location";
    if (!user) message = "fetching user info";
    if (!cards) message = "fetching users card";

    return <SplashPage onPress={setReload} message={message} />;
  }
  return (
    <>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item
          style={{
            backgroundColor: "#eae4dd",
            width: "100%",
          }}
          containerStyle={{
            backgroundColor: "red",
          }}
        >
          <CardScreen cards={cards} location={location} user={user} navigation={navigation} />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <HomeScreen userDetails={user} navigation={navigation} />
        </TabView.Item>
        <TabView.Item
          style={{
            backgroundColor: "green",
            width: "100%",
          }}
        >
          <MapPage location={location} />
        </TabView.Item>
      </TabView>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "#604a33",
          height: 5,
          top: 0,
        }}
        variant="default"
        containerStyle={{
          backgroundColor: "#e9e2d7",
          elevation: 1,
          height: "100%",
          height: 70,
        }}
      >
        <Tab.Item
          title="Wallet"
          titleStyle={(active) => ({
            fontSize: 16,
            color: "#e1b894",
            color: active ? "#604a33" : "#e1b894",
          })}
          icon={(active) => ({
            name: "wallet",
            size: 30,
            type: "material-community",
            color: active ? "#604a33" : "#e1b894",
          })}
        />
        <Tab.Item
          title="Home"
          titleStyle={(active) => ({
            fontSize: 16,
            color: active ? "#604a33" : "#e1b894",
          })}
          icon={(active) => ({
            name: "home",
            size: 30,
            type: "entypo",
            color: active ? "#604a33" : "#e1b894",
          })}
        />
        <Tab.Item
          title="Map"
          titleStyle={(active) => ({
            fontSize: 16,
            color: "#e1b894",
            color: active ? "#604a33" : "#e1b894",
          })}
          icon={(active) => ({
            name: "map",
            size: 30,
            type: "font-awesome-5",
            color: active ? "#604a33" : "#e1b894",
          })}
        />
      </Tab>
    </>
  );
}
