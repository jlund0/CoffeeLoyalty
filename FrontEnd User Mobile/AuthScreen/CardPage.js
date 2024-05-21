import {
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { ListItem, Icon, SearchBar, Image, Button } from "@rneui/themed";
import { RedeemButton } from "../components/buttons";
import { getCards } from "../firestoreFunctions";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundImage } from "@rneui/base";
import { List } from "reactstrap";
import { linkWithRedirect } from "firebase/auth";
import { sortListbyDistance } from "../useful-functions";
export default function CardScreen({ cards, location, user }) {
  const [search, setSearch] = useState("");
  const [cardsList, setCardsList] = useState(cards);
  const [refreshing, setRefreshing] = useState(false);
  const [gridLayout, setGridLayout] = useState(false);
  const updateSearch = (search) => {
    setSearch(search);
  };

  const filterList = (list) => {
    list = sortListbyDistance(list, location);

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
    <BackgroundImage
      source={require("../assets/background-blob.png")}
      resizeMode="cover"
      style={{
        flex: 1,
        paddingTop: 50,
      }}
    >
      <SearchBar
        onChangeText={updateSearch}
        value={search}
        placeholder="Find store"
        lightTheme={true}
        containerStyle={{
          paddingHorizontal: 15,
          paddingTop: 20,
          borderRadius: 2,
          backgroundColor: "transparent",
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,

          borderWidth: 0,
        }}
        inputContainerStyle={{
          backgroundColor: "white",
          borderRadius: 5,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderBottomWidth: 8,
          borderRightWidth: 8,
          borderColor: "black",
        }}
        round={true}
        platform="android"
      />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          margin: 15,
          borderRadius: 5,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderBottomWidth: 8,
          borderRightWidth: 8,
          borderColor: "black",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filterList(cardsList).map((card, index) => (
          <CardWidget
            card={card}
            key={index}
            user={user}
            fetchCards={handleRefresh}
          />
        ))}
        <View style={{ height: 150 }}></View>
      </ScrollView>
    </BackgroundImage>
  );
}

function CardWidget({ card, user, fetchCards }) {
  const [expanded, setExpanded] = useState(false);
  const [width, setWidth] = useState(0);

  const Stampcard = ({ i }) => {
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
                }}
              >
                <Image
                  source={require("../assets/bean_stamp.png")}
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
                color: "#B7CADB",
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
            resizeMode="contain"
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
              }}
            >
              <LinearGradient
                colors={["#604a33", "#8e6c49"]}
                style={{
                  width: "101%",
                  height: "100%",
                  flexDirection: "row",
                  padding: 5,
                  paddingHorizontal: 10,
                  elevation: 1,
                  justifyContent: "center",
                  alignItems: "center",
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
              </LinearGradient>
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
    borderRadius: 2,
    border: 2,
    resizeMode: "contain",
    height: "100%",
    backgroundColor: "white",
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
