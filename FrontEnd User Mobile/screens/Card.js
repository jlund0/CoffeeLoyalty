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
import { useState, useCallback,useRef} from "react";
import { UserButton } from "../components/buttons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getUserCards, getStoreInfo, getStoreLogo } from "../firebasefunctions";
import { useEffect } from "react";
import { CoffeeCupIcon } from "../assets/socialSVG";
import { getDistanceFromLatLonInKm, geocode } from "../components/location";
import { LinearGradient } from "expo-linear-gradient";
import * as geofire from "geofire-common";
import { sortListbyDistance } from "../useful-functions";
import {WebView} from 'react-native-webview'
import { Bean } from "../assets/socialSVG";
import LottieView from 'lottie-react-native';
import { useFonts } from "expo-font";

export default function CardScreen({ navigation }) {
  console.log("Card page");
  const isFocused = useIsFocused();
  const [cards, setCards] = useState(null);
  const [searchStoreFilter, setSearchFilter] = useState("");
  const [location, setLocation] = useState();
  const [addCardPopupVisaible, setCardPopupVisabile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


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
  }, [refreshing]);

  const Loading = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Getting Your Cards </Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const filterList = (list) => {
    if (location) {
      list = sortListbyDistance(location, list);
    }
    return list.filter((card) =>
      card.name.toLowerCase().includes(searchStoreFilter.toLowerCase())
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    'TitanOne-Regular': require('../assets/fonts/TitanOne-Regular.ttf'),

  });

  return (
    <View style={styles.maincontainer}>
      <View style={[styles.greetings]}>
        <Text
          style={{
            fontWeight: "normal",
            fontSize: 30,
            fontFamily: "TitanOne-Regular",
          }}
        >
          Your Cards
        </Text>
        <UserButton />
      </View>
        <View style={{ flex: 0.5, padding: 10 , flexDirection:"row" ,width: "95%",alignSelf:"center",columnGap:10}}>
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
          <Pressable style={{backgroundColor: themes.widgetbg,borderRadius: 25,padding:5,justifyContent:"center",alignItems:"center"}}>
            <MaterialCommunityIcons name="filter-variant" size={30} styles={{}}/>
            </Pressable>
        </View>
        <View style={styles.scrollWrapper}>
        <ScrollView style={styles.cardsContainer} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          {cards === null ? (
            <Loading />
          ) : cards.length == 0 ?(
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
          )
          : (
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
        </ScrollView>
      </View>
      <NavBar navigation={navigation} isFocused={isFocused ? "card" : null} />
    </View>
  );
}

function CardWidget({ navigation, card}) {
  const [beanBoxsize, setBeanboxSize] = useState(1)
  const animation = useRef(null);
  const navigateLoyaltyPage = (card) => {
    navigation.push("loyaltyCard", card);
  };
  const [fontsLoaded, fontError] = useFonts({
    // 'Fredoka': require('../assets/fonts/Fredoka-SemiBold.ttf'),

  });
    const BeanCounter = () =>{
      let beans = []
      let coffee = card.coffees_required
      for(let i = 0; i < coffee ; i++ ){

        if( i < card.coffeesEarnt){
          beans.push(
          <View style={{flex:1 ,paddingHorizontal:2.5}}><Bean height="100%"  fill={`rgb(${(i+coffee)*139/coffee}, ${(i+coffee)*69/coffee}, ${(i+coffee)*19/coffee})`} width="100%"/></View>)
        }else{
          beans.push(<View style={{flex:1  ,paddingHorizontal:2.5}}><Bean fill={"black"} height="100%" width="100%"/></View>)
        }
        
      }
      return(
        beans
      )
    }


  return (
    <Pressable
      style={{
        flexDirection: "row",
        borderRadius: 15,
        width: "100%",
        backgroundColor: themes.widgetbg,
        alignItems: "center",
        
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        columnGap:10,
        maxHeight:200,
        
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
          width: "20%",
          height: "100%",          
          resizeMode: "center",
          resizeMode:"contain",
          flex:1,
    
        }}
        source={{
          uri: card.logo,
        }}
      />
      <View
        style={{
          justifyContent: "center",
          flex:4,
          height:"100%",
}}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textTransform: "uppercase",
            flex:1,
            fontFamily:"Fredoka"
          }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {card.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 15, textDecorationLine: "underline" ,  flex:1}}
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
        
        <View style={{flex:1, flexDirection:"row"}} onLayout={(event)=>{setBeanboxSize(event.nativeEvent.layout)}}>          
          <BeanCounter/>
        </View></View>
        {/* {card.coffeesEarnt ==card.coffees_required&&
        <LottieView
        autoPlay
        ref={animation}
        style={{
          flex:1,
          height:"100%",
          aspectRatio:1
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/cupanimation.json')}
      />} */}
      
     
    </Pressable>
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
