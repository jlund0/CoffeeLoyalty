import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Linking,
  ImageBackground,
  RefreshControl,
} from "react-native";
import NavBar from "../components/NavBar";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import { useState, useCallback } from "react";
import { UserButton } from "../components/buttons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getUserCards, getStoreInfo, getStoreLogo } from "../firebasefunctions";
import { useEffect } from "react";
import { CoffeeCupIcon } from "../assets/socialSVG";
import { getDistanceFromLatLonInKm, geocode } from "../components/location";
import { LinearGradient } from "expo-linear-gradient";
import * as geofire from "geofire-common";
import { sortListbyDistance } from "../useful-functions";

{
  /* TODO make filter sort by distance from store 
    Possibly add ability to add card
  */
}
export default function CardScreen({ navigation }) {
  console.log("Card page");
  const isFocused = useIsFocused();
  const [cards, setCards] = useState([]);
  const [searchStoreFilter, setSearchFilter] = useState("");
  const [location, setLocation] = useState();
  const [addCardPopupVisaible, setCardPopupVisabile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // useEffect(() => {
  //   const getPermissions = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.log("presmission not granted");
  //       return;
  //     }

  //     let currentLocation = await Location.getCurrentPositionAsync({});
  //     setLocation(currentLocation);
  //     console.log("Location:");
  //     console.log(currentLocation);
  //   };
  //   getPermissions();
  // }, []);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("gotlocation");
      console.log(location);
      setLocation(location.coords);
    };
    getLocation();
  }, []);

  useEffect(() => {
    async function fetchCards() {
      try {
        const data = await getUserCards();
        setCards(data);
      } catch (error) {
        // add error handling here
        console.log(error);
      }
    }

    fetchCards();
  }, []);

  const Loading = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Getting Your Cards </Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const filterList = (list) => {
    // console.log(location)
    if (location) {
      list = sortListbyDistance(location, list);
    }
    return list.filter((card) =>
      card.name.toLowerCase().includes(searchStoreFilter.toLowerCase())
    );
    // return Array(10).fill(list[0]);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.maincontainer}>
      <View style={[styles.greetings]}>
        <Text
          style={{
            fontWeight: "normal",
            fontSize: 30,

            fontFamily: "TitanOne_400Regular",
          }}
        >
          Your Cards
        </Text>
        <UserButton />
      </View>
      <View
        style={{
          flex: 0.5,
          padding: 10,
          flexDirection: "row",
          width: "95%",
          alignSelf: "center",
          columnGap: 10,
        }}
      >
        <TextInput
          style={{
            borderRadius: 20,
            width: "auto",
            backgroundColor: themes.widgetbg,
            // marginHorizontal: 20,
            padding: 10,
            paddingHorizontal: 20,
            flex: 1,
          }}
          placeholder="Find Store"
          onChangeText={(newVal) => setSearchFilter(newVal)}
        />
        <Pressable
          style={{
            backgroundColor: themes.widgetbg,
            borderRadius: 25,
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name="sort" size={30} styles={{}} />
        </Pressable>
      </View>
      <View style={styles.scrollWrapper}>
        <ScrollView
          style={styles.cardsContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {cards === null ? (
            <Loading />
          ) : (
            filterList(cards).map((card, index) => (
              <CardWidget
                card={card}
                key={index}
                navigation={navigation}
                filter={searchStoreFilter}
                // location={location}
              />
            ))
          )}
          {cards.length == 0 && (
            <View
              style={[
                {
                  borderRadius: 20,
                  width: "100%",
                  backgroundColor: themes.widgetbg,
                  height: "100%",
                  padding: 20,
                },
              ]}
            >
              <Text style={styles.noCardText}>
                No active cards!{"\n"}Time to get a coffee
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      <NavBar navigation={navigation} isFocused={isFocused ? "card" : null} />
    </View>
  );
}

function CardWidget({ navigation, card, location }) {
  // const getDistance = (lat1, lon1, lat2, lon2) => {
  //   return 0;
  // };
  // useEffect(() => {
  //   async function getDistance() {
  //     console.log(card.location);
  //     let storeLocation = await geocode(card.location);
  //     console.log(storeLocation);
  //     let distance = getDistanceFromLatLonInKm(
  //       location.latitude,
  //       location.longitude,
  //       storeLocation.latitude,
  //       storeLocation.longitude
  //     );
  //     console.log(distance);
  //   }
  //   getDistance();
  // }, []);

  const navigateLoyaltyPage = (card) => {
    console.log("push: " + card);
    navigation.push("loyaltyCard", card);
  };

  // const Loading = () => {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text>Getting Store Info </Text>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // };

  return (
    <Pressable
      style={{
        flexDirection: "row",
        borderRadius: 25,
        width: "100%",
        backgroundColor: themes.widgetbg,
        minHeight: 100,
        alignItems: "center",
        padding: 10,
        marginVertical: 5,
      }}
      onPress={() => {
        navigateLoyaltyPage(card);
      }}
    >
      {/* {loading ? (
        <Loading />
      ) : ( */}

      <Image
        style={{
          width: 60,
          height: 60,
          resizeMode: "center",
        }}
        source={{
          uri: card.logo,
        }}
      />
      <View
        style={{
          justifyContent: "center",
          width: "60%",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontWeight: 40,
            fontSize: 18,
            fontWeight: "bold",
            textTransform: "uppercase",
            // fontFamily: "TitanOne-Regular",
          }}
        >
          {card.name}
        </Text>
        <Text
          style={{ fontSize: 15, textDecorationLine: "underline" }}
          onPress={() => {
            Linking.openURL(
              `https://www.google.com/maps/place/${card.location.replace(
                " ",
                "+"
              )}`
            );
          }}
        >
          {card.location}{" "}
        </Text>
        {/* <Text>{getDistance}Away</Text> */}
      </View>

      {/* TODO add cup icon that filled based on amount of coffees on loyalty card */}
      <View
        style={
          {
            // height: "100%",
            // justifyContent: "center",
            // padding: "auto",
          }
        }
      >
        <CoffeeCupIcon width={70} height={70} fill="transparent" />

        {/* <View<LinearGradient style={{
            position: "absolute",
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            height: 35 ,
            width: 40,
            bottom: "15%",
            right: "25%",
            zIndex: -1,
            elevation: -1,
          }} colors={["transparent", "transparent","#fdf5c9","#be9b7b"]} locations={[0,1-(card.coffeesEarnt / card.coffees_required),1-(card.coffeesEarnt / card.coffees_required),1] }/>
          style={{
            position: "absolute",
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            backgroundColor: "#583927",
            height: 35 * (card.coffeesEarnt / card.coffees_required),
            width: 40,
            bottom: "15%",
            right: "25%",
            zIndex: -1,
            elevation: -1,
          }}
        ></View> */}
      </View>
    </Pressable>
  );
}

// function AddCardPopup() {
//   return (
//     <View style={{ position: "absolute" }}>
//       <TextInput placeholder="Enter Store" />
//       <Text>Or Scan Store QR</Text>
//       <Pressable>
//         <AntDesignIcon name="camera" size={50} />
//       </Pressable>
//     </View>
//   );
// }

const themes = {
  bg: "#fff8e7",
  widgetbg: "#cdb891",
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    height: Dimensions.get("window").height,
    width: "100%",
    overflow: "hidden",
  },
  scrollWrapper: { flex: 6 },
  maincontainer: {
    height: Dimensions.get("window").height,
    width: "100%",
    // backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: "#936748",
    // overflow: "hidden",
    rowGap: 10,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    // height: 500,
    height: "100%",
  },
  greetings: {
    paddingHorizontal: 20,
    height: "15%",
    backgroundColor: themes.widgetbg,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cards: {
    flexDirection: "row",
    borderRadius: 25,
    borderWidth: 5,
    width: "100%",
    backgroundColor: themes.widgetbg,
  },
  cardpoints: {},
  pointsTotal: {},
  cardname: {
    fontWeight: 50,
  },
  cards: {},
  addCard: {
    position: "absolute",
    right: "10%",
    bottom: "5%",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  noCardText: {
    alignSelf: "center",
    fontSize: 40,
    textAlign: "center",
  },
});
