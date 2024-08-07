import {
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
} from "react-native";
import TouchableScale from 'react-native-touchable-scale';
import { useState, useEffect, useCallback } from "react";
import { ListItem, Icon, SearchBar, Image, Button } from "@rneui/themed";
import { RedeemButton } from "../components/buttons";
import { getCards } from "../firestoreFunctions";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundImage } from "@rneui/base";
import { List } from "reactstrap";
import { linkWithRedirect } from "firebase/auth";
import { sortListbyDistance } from "../useful-functions";
import { theme } from "../theme"
export default function CardScreen({ navigation, cards, location, user }) {
  const [search, setSearch] = useState("");
  const [cardsList, setCardsList] = useState(cards);
  const [refreshing, setRefreshing] = useState(false);
  const [gridLayout, setGridLayout] = useState(false);
  const [display, setDisplay] = useState(true)
  const updateSearch = (search) => {
    setSearch(search);
  };

  const filterList = (list) => {
    if (refreshing) list = sortListbyDistance(list, location);

    return list.filter((card) =>
      card.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  async function handleRefresh() {
    try {
      setRefreshing(true);
      console.log("refreshing");
      console.log(user);
      console.log(cardsList);
      const cards = await getCards(user);
      console.log(cards);
      setCardsList(cards);
      setRefreshing(false);
    } catch (error) {
      // add error handling here
      console.log(error);
    }
  }

  return (

    <View style={{
      flex: 1,
      paddingTop: 50,
      backgroundColor: theme.bg,
      padding: 10
    }}>

      <View style={{
        flex: 1,
        backgroundColor: theme.p,
        margin: 15,
        borderRadius: 30,
        borderColor: "black",
        padding: 20


      }}>
        <SearchBar
          onChangeText={updateSearch}
          value={search}
          placeholder="Find store"
          lightTheme={true}
          leftIconContainerStyle={{ color: "white" }}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          placeholderTextColor={"white"}
          inputContainerStyle={{
            backgroundColor: theme.standout,
            borderRadius: 30,

          }}
          round={true}
          platform="android"
        /><Button icon={{
          name: display ? "grid" : "list",
          type: 'feather',
          size: 15,
          color: 'white',
        }} onPress={() => setDisplay(!display)} />
        <ScrollView
          style={{
            flex: 1,

          }}
          contentContainerStyle={!display && {
            flex: 1,
            flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >

          {filterList(cardsList).map((card, index) => (
            <CardWidgetv2
              card={card}
              key={index}
              user={user}
              fetchCards={handleRefresh}
              navigation={navigation}
              display={display}
            />
          ))}
          {/* <View style={{ height: 150 }}></View> */}
        </ScrollView></View></View>

  );
}

function CardWidget({ card, user, fetchCards }) {
  const [expanded, setExpanded] = useState(false);
  const [width, setWidth] = useState(0);

  const Stampcard = ({ i }) => {
    let stamps = ["cup", "star", "bean", "star1"];
    randomStamp = stamps[Math.floor(Math.random() * stamps.length)];
    const Row = ({ list }) => (
      <View
        style={{
          flexDirection: "row",
          height: 75,

          justifyContent: "space-around",
        }}
      >
        {list.map((i) => (
          <View
            style={[styles.stampbox, { maxWidth: width }]}
            key={i}
            onLayout={(event) => {
              width == 0 && setWidth(event.nativeEvent.layout.height);
            }}
          >
            {i + 1 <= card.points && (
              <View
                style={{
                  zIndex: 1,
                  position: "absolute",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                <Image
                  source={
                    randomStamp === "cup"
                      ? require("../assets/stamps/cup.png")
                      : randomStamp === "star"
                        ? require("../assets/stamps/star.png")
                        : randomStamp === "star1"
                          ? require("../assets/stamps/star1.png")
                          : require("../assets/stamps/bean.png")
                  }
                  style={{
                    width: "100%",
                    height: undefined,
                    aspectRatio: 1,
                  }}
                />
              </View>
            )}
            <Text
              style={{
                fontSize: 64,
                fontWeight: "bold",
                color: "#C4A484",
              }}
              adjustsFontSizeToFit={true}
            // numberOfLines={1}
            >
              {i + 1}
            </Text>
          </View>
        ))}
      </View>
    );

    const list = [...Array(card.coffees_required).keys()];
    const half_length = Math.ceil(list.length / 2);
    const list1 = list.slice(0, half_length);
    const list2 = list.slice(half_length);
    return (
      <View style={styles.list}>
        <Row list={list1} />
        <Row list={list2} />
      </View>
    );
  };

  return (
    <ListItem.Accordion
      containerStyle={[
        {
          marginTop: 20,
          marginHorizontal: 20,
          borderRadius: 10,
          backgroundColor: "#C4A484",
          marginBottom: 10,
          zIndex: 1,
          borderWidth: 3,
          borderColor: "black",
        },
        expanded && {
          marginBottom: 0,
        },
      ]}
      content={
        <>
          <Image
            source={{ uri: card.logo }}
            containerStyle={styles.logo}
            PlaceholderContent={<ActivityIndicator />}
          // resizeMode="center"
          />
          <ListItem.Content
            style={{
              paddingHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              width: "100%",
              backgroundColor: "white",
              padding: 10,
              marginHorizontal: 10,
              borderRadius: 3,
            }}
          >
            <ListItem.Title
              style={{
                fontWeight: "bold",
                fontSize: 16,
                flex: 1,
              }}
              numberOfLines={1}
            // adjustsFontSizeToFit={true}
            >
              {card.name}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} style={{ fontSize: 12 }}>
              {card.location}
            </ListItem.Subtitle>
          </ListItem.Content>
          {!expanded && (
            <View
              style={{
                position: "absolute",
                bottom: -20,
                right: -3,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                borderWidth: 3,
                borderColor: "black",
                borderRadius: 10,
                borderTopWidth: 2,
                borderLeftWidth: 2,
                borderBottomWidth: 8,
                borderRightWidth: 8,
                overflow: "hidden",
                backgroundColor: "#604a33",
                flexDirection: "row",
                padding: 5,
                paddingHorizontal: 10,
              }}
            >

              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                {card.points}/{card.coffees_required}
              </Text>
              <Icon
                type="material-community"
                name={
                  card.coffees_required == card.points
                    ? "coffee"
                    : "coffee-outline"
                }
                style={{ paddingLeft: 3 }}
                size={22}
                color="#7BC9FF"
              />

            </View>
          )}
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <ListItem
        containerStyle={{
          marginHorizontal: 20,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          marginVertical: 10,
          zIndex: -1,
          backgroundColor: "#a4927a",
          flex: 1,
          borderWidth: 3,
          borderColor: "black",
        }}
      >
        <ListItem.Content>
          <Stampcard />
          <RedeemButton
            disabled={card.coffees_required == card.points ? false : true}
            card={card}
            uid={user.uid}
            fetchCards={fetchCards}
          />
        </ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  );
}
const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: 170,
    justifyContent: "space-around",
  },
  logo: {
    aspectRatio: 1,
    width: "18%",
    borderRadius: 50,
    border: 2,
    resizeMode: "contain",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  stampbox: {
    // aspectRatio: 1,
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});


function CardWidgetv2({ navigation, card, user, fetchCards, display }) {
  console.log(card)
  if (!display) {
    return (
      <Pressable
        onPress={() => { navigation.navigate("stamppage", { card, user }) }}
        style={{ width: 150, aspectRatio: 1, marginVertical: 15, borderRadius: 20, padding: 15, backgroundColor: theme.c }}>
        <Image
          source={{ uri: card.logo }}
          containerStyle={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
        // resizeMode="center"
        />
        <View
          style={{
            position: "absolute",
            bottom: -10,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            // borderWidth: 3,
            borderColor: "black",
            borderRadius: 10,
            // borderTopWidth: 2,
            // borderLeftWidth: 2,
            // borderBottomWidth: 8,
            // borderRightWidth: 8,
            overflow: "hidden",
            backgroundColor: theme.standout,
            flexDirection: "row",
            padding: 5,
            paddingHorizontal: 10,
          }}
        >

          <Text
            style={{ fontSize: 18, textAlign: "center", color: "white" }}
          >
            {card.points}/{card.coffees_required}
          </Text>
          <Icon
            type="material-community"
            name={
              card.coffees_required == card.points
                ? "coffee"
                : "coffee-outline"
            }
            style={{ paddingLeft: 3 }}
            size={22}
            color="#7BC9FF"
          />

        </View>
      </Pressable>
    )
  }
  return (
    <ListItem Component={TouchableScale}
      friction={90} //
      tension={100} // These props are passed to the parent component (here TouchableScale)
      activeScale={0.95} onPress={() => { navigation.navigate("stamppage", { card, user }) }} containerStyle={{ marginVertical: 15, borderRadius: 20, padding: 15, backgroundColor: theme.c }} round>
      <Image
        source={{ uri: card.logo }}
        containerStyle={styles.logo}
        PlaceholderContent={<ActivityIndicator />}
      // resizeMode="center"
      />
      <ListItem.Content
        style={{
          // paddingHorizontal: 20,

          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          width: "100%",
          // backgroundColor: "white",
          padding: 5,
          marginHorizontal: 10,
          borderRadius: 3,
        }}
      >
        <ListItem.Title
          style={{
            fontWeight: 800,
            fontSize: 28,
            flex: 1,
            color: theme.text_main
          }}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {card.name}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} style={{ fontSize: 16, color: theme.text_second }}>
          {card.location}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
      <View
        style={{
          position: "absolute",
          bottom: -10,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          // borderWidth: 3,
          borderColor: "black",
          borderRadius: 10,
          // borderTopWidth: 2,
          // borderLeftWidth: 2,
          // borderBottomWidth: 8,
          // borderRightWidth: 8,
          overflow: "hidden",
          backgroundColor: theme.standout,
          flexDirection: "row",
          padding: 5,
          paddingHorizontal: 10,
        }}
      >

        <Text
          style={{ fontSize: 18, textAlign: "center", color: "white" }}
        >
          {card.points}/{card.coffees_required}
        </Text>
        <Icon
          type="material-community"
          name={
            card.coffees_required == card.points
              ? "coffee"
              : "coffee-outline"
          }
          style={{ paddingLeft: 3 }}
          size={22}
          color="#7BC9FF"
        />

      </View>
    </ListItem>
  )
}