import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import NavBar from "../components/NavBar";
import { useIsFocused } from "@react-navigation/native";
// import GetLocation from "react-native-get-location";
import { useState } from "react";
import { UserButton } from "../components/buttons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getUserCards, getStoreInfo, getStoreLogo } from "../firebasefunctions";
import { useEffect } from "react";
import { CoffeeCupIcon } from "../assets/socialSVG";

export default function CardScreen({ navigation, route }) {
  console.log("Card page");
  const isFocused = useIsFocused();
  console.log(route.params);
  const [cards, setCards] = useState(route.params);
  const [searchStoreFilter, setSearchFilter] = useState("");

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       // set loading to true before calling API
  //       setLoading(true);
  //       const data = await getUserCards();
  //       setCards(data);
  //       // switch loading to false after fetch is complete
  //       setLoading(false);
  //     } catch (error) {
  //       // add error handling here
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);
  const navigateLoyaltyPage = (card) => {
    console.log("push: " + card);
    navigation.push("loyaltyCard", card);
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
            padding: 20,
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

          {cards.map((card) => (
            <CardWidget
              card={card}
              navigation={navigateLoyaltyPage}
              key={card.cardid}
            />
          ))}
        </View>
      </View>
      <NavBar navigation={navigation} isFocused={isFocused ? "card" : null} />
    </View>
  );
}

function CardWidget({ navigation, card }) {
  console.log("card: " + card);
  const getDistance = (lat1, lon1, lat2, lon2) => {
    return 0;
  };
  // const [cardInfo, setCardInfo] = useState({});
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       const data = await getStoreInfo(card.store);
  //       data.coffees_purchased = card.coffees_purchased;
  //       setCardInfo(data);
  //       setLoading(false);
  //     } catch (error) {
  //       // add error handling here
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  //   console.log(cardInfo);
  // }, []);

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
        navigation(cardInfo);
      }}
    >
      <Image
        style={{
          width: 60,
          height: 60,
          loading: "lazy",
        }}
        //find logo under
        // source={storeimg}
        source={{
          uri: cardInfo.logo,
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
          }}
        >
          {cardInfo.name}
        </Text>
        <Text style={{ fontSize: 15 }}>{cardInfo.location} </Text>
        <Text>{getDistance}Away</Text>
      </View>
      {/* TODO add cup icon that filled based on amount of coffees on loyalty card */}
      {/* <View
        style={{
          height: "100%",
          justifyContent: "center",
          padding: "auto",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            height: "100%",
            textAlign: "center",
            margin: "auto",
          }}
        >
          {cardInfo.coffees_purchased}/{cardInfo.coffees_required}{" "}
        </Text>
        
        <CoffeeCupIcon width={70} height={70} />
      </View> */}
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
