import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import NavBar from "../components/NavBar";
import { useIsFocused } from "@react-navigation/native";
// import GetLocation from "react-native-get-location";
import { useState } from "react";
import { UserButton } from "../components/buttons";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function Card({ navigation }) {
  console.log("Card page");
  const isFocused = useIsFocused();
  const [searchStoreFilter, setSearchFilter] = useState("");
  //  List of loyality cards customer has
  let cards = [
    {
      name: "Starbucks",
      pointsTotal: 6,
      logo: "starbuck_test/logo.png",
      stamp: "bean_stamp.png",
      address: "10 test street perth",
    },
  ];

  const navigateLoyaltyPage = (card) => {
    console.log(card);
    navigation.replace("loyaltyCard", card);
  };

  // GetLocation.getCurrentPosition({
  //   enableHighAccuracy: true,
  //   timeout: 60000,
  // })
  //   .then((location) => {
  //     let userLocation = location;
  //   })
  //   .catch((error) => {
  //     const { code, message } = error;
  //     console.warn(code, message);
  //   });

  // let cards= getCards(userID)
  return (
    <View style={styles.maincontainer}>
      <View>
        <View style={styles.greetings}>
          <Text style={{ fontSize: 36, fontWeight: "normal" }}>Your Cards</Text>
          <UserButton />
        </View>

        <View
          style={{
            padding: 40,
            height: "auto",
          }}
        >
          <TextInput
            style={{
              borderRadius: 25,
              borderWidth: 5,
              borderColor: "#d3d3d3",
              width: "100%",
              backgroundColor: "#fff",

              marginBottom: 15,
            }}
            placeholder="Find Store"
            onChangeText={(newVal) => setSearchFilter(newVal)}
          ></TextInput>
          {cards.map((card, i) => (
            <StoreCard key={i} card={card} navigation={navigateLoyaltyPage} />
          ))}
        </View>
      </View>
      <NavBar navigation={navigation} isFocused={isFocused ? "card" : null} />
    </View>
  );
}

function StoreCard({ navigation, card }) {
  const getDistance = (lat1, lon1, lat2, lon2) => {
    return 0;
  };
  return (
    <Pressable
      style={{
        flexDirection: "row",
        borderRadius: 25,
        borderWidth: 5,
        borderColor: "#d3d3d3",
        width: "100%",
        backgroundColor: "#fff",
        minHeight: 100,
        alignItems: "center",
        padding: 20,
      }}
      onPress={() => {
        navigation(card);
        console.log(card);
      }}
    >
      <Image
        style={{
          width: 60,
          height: 60,
        }}
        source={require(`../assets/${card.logo}`)}
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
          }}
        >
          {card.name}
        </Text>
        <Text style={{ fontSize: 15 }}>{card.address} </Text>
        <Text>{getDistance} Away</Text>
      </View>
      <View style={{ paddingRight: 25 }}>
        <Text
          style={{
            fontSize: 30,
            height: "100%",
          }}
        >
          0/{card.pointsTotal} <FeatherIcon size={30} name="coffee" />
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    minHeight: Dimensions.get("window").height,
    maxHeight: Dimensions.get("window").height,
    width: "100%",
    // backgroundColor: "#fff",
    flexDirection: "column",
    rowGap: 50,
    justifyContent: "space-between",
  },
  cardsContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
  },
  greetings: {
    minHeight: "15%",
    backgroundColor: "#d3d3d3",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 40,
  },
  cards: {
    flexDirection: "row",
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "#d3d3d3",
    width: "100%",
    backgroundColor: "#fff",
  },
  cardContainer: {
    padding: 10,
    borderWidth: 8,
    borderColor: "#d3d3d3",
  },
  cardpoints: {},
  pointsTotal: {},
  cardname: {
    fontWeight: 50,
  },
  cards: {},
});
