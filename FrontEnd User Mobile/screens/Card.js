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
} from "react-native";
import NavBar from "../components/NavBar";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import { useState } from "react";
import { UserButton } from "../components/buttons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { getUserCards, getStoreInfo, getStoreLogo } from "../firebasefunctions";
import { useEffect } from "react";
import { CoffeeCupIcon } from "../assets/socialSVG";
import { getDistanceFromLatLonInKm, geocode } from "../components/location";

{
  /* TODO make filter sort by distance from store 
    Possibly add ability to add card
  */
}
export default function CardScreen({ navigation }) {
  console.log("Card page");
  const isFocused = useIsFocused();
  const [cards, setCards] = useState(null);
  const [searchStoreFilter, setSearchFilter] = useState("");
  const [location, setLocation] = useState();
  const [addCardPopupVisaible, setCardPopupVisabile] = useState(false);
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
  console.log(cards);
  const Loading = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Getting Your Cards </Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const filterList = (list) => {
    console.log("filter");

    console.log(list);
    return list.filter((card) =>
      card.name.toLowerCase().includes(searchStoreFilter.toLowerCase())
    );
    // return Array(10).fill(list[0]);
  };

  return (
    <View style={styles.maincontainer}>
      <ImageBackground
        source={require("../assets/card_background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={[styles.greetings, styles.shadowProp]}>
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
        <View style={{ flex: 1, padding: 10 }}>
          <TextInput
            style={{
              borderRadius: 25,
              borderWidth: 5,
              borderColor: "black",
              width: "auto",
              backgroundColor: themes.widgetbg,
              marginHorizontal: 20,

              padding: 10,
              paddingHorizontal: 20,
              flex: 1,
            }}
            placeholder="Find Store"
            onChangeText={(newVal) => setSearchFilter(newVal)}
          />
        </View>
        <View style={styles.cardsContainer}>
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
          {/* <View style={{ height: 500 }}></View> */}
          <Pressable
            style={styles.addCard}
            onClick={() => setCardPopupVisabile(true)}
          >
            <AntDesignIcon name="pluscircle" size={60} />
            {addCardPopupVisaible ? AddCardPopup : null}
          </Pressable>
        </View>

        <NavBar
          navigation={navigation}
          isFocused={isFocused ? "card" : null}
          style={{ flex: 1 }}
        />
      </ImageBackground>
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
        borderWidth: 5,
        width: "100%",
        backgroundColor: themes.widgetbg,
        minHeight: 100,
        alignItems: "center",
        padding: 20,
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
          loading: "lazy",
        }}
        source={{
          uri: card.logo,
        }}
      />
      <View
        style={{
          justifyContent: "center",
          width: "60%",
          paddingHorizontal: 20,
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
        style={{
          height: "100%",
          justifyContent: "center",
          padding: "auto",
        }}
      >
        <CoffeeCupIcon width={70} height={70} fill="transparent" />
        <View
          style={{
            position: "absolute",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: "#583927",
            height: 35 * (card.coffees_purchased / card.coffees_required),
            width: 40,
            bottom: "15%",
            right: "25%",
            zIndex: -1,
            elevation: -1,
          }}
        ></View>
      </View>
    </Pressable>
  );
}

function AddCardPopup() {
  return (
    <View style={{ position: "absolute" }}>
      <TextInput placeholder="Enter Store" />
      <Text>Or Scan Store QR</Text>
      <Pressable>
        <AntDesignIcon name="camera" size={50} />
      </Pressable>
    </View>
  );
}

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

  maincontainer: {
    height: Dimensions.get("window").height,
    width: "100%",
    // backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    // overflow: "hidden",
  },
  cardsContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
    // height: 500,
    flex: 10,
  },
  greetings: {
    flex: 1,
    backgroundColor: themes.widgetbg,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 40,
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
});
