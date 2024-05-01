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
import { getCards } from "../firebasefunctions";
import { LinearGradient } from "expo-linear-gradient";

export default function CardScreen({ cards, location, user }) {
  const [search, setSearch] = useState("");
  const [cardsList, setCardsList] = useState(cards);
  const [refreshing, setRefreshing] = useState(false);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const filterList = (list) => {
    // list = sortListbyDistance(list, location);
    return list.filter((card) =>
      card.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  function handleRefresh() {
    try {
      console.log(user);
      setRefreshing(false);
      getCards(user.cards).then((data) => {
        setCardsList(data);
        setRefreshing(true);
      });
    } catch (error) {
      // add error handling here
      console.log(error);
    }
  }

  return (
    <>
      <View style={{}}>
        <SearchBar
          onChangeText={updateSearch}
          value={search}
          placeholder="Find store"
          lightTheme={true}
          containerStyle={{
            paddingHorizontal: 15,
            paddingTop: 20,
            borderRadius: 2,
            backgroundColor: "#eae4dd",
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,

            borderWidth: 0,
          }}
          inputContainerStyle={{ backgroundColor: "white", borderRadius: 5 }}
          round={true}
          platform="android"
        />
      </View>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          margin: 15,
          borderRadius: 5,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filterList(cardsList).map((card, index) => (
          <CardWidget card={card} key={index} />
        ))}
      </ScrollView>
    </>
  );
}

function CardWidget({ card }) {
  const [expanded, setExpanded] = useState(false);
  let coffeesRequired = card.coffees_required / 2;

  const Stampcard = ({ i }) => {
    return (
      <>
        <View style={styles.stampbox} key={`key + ${card.id}`}>
          {i.index + 1 <= card.coffeesEarnt && (
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
            numberOfLines={1}
          >
            {i.index + 1}
          </Text>
        </View>
      </>
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
          />
          <ListItem.Content style={{ paddingHorizontal: 20 }}>
            <ListItem.Title style={{ fontWeight: "bold", fontSize: 20 }}>
              {card.name}
            </ListItem.Title>
          </ListItem.Content>
          {!expanded && (
            <View
              style={{
                position: "absolute",
                bottom: -10,
                right: 0,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <LinearGradient
                colors={["#604a33", "#8e6c49"]}
                style={{
                  width: "100%",
                  height: "100%",
                  flexDirection: "row",
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  elevation: 1,
                }}
              >
                <Text
                  style={{ fontSize: 18, textAlign: "center", color: "white" }}
                >
                  {card.coffeesEarnt}/{card.coffees_required}
                </Text>
                <Icon
                  type="ant-design"
                  name={
                    card.coffees_required == card.coffeesEarnt
                      ? "star"
                      : "staro"
                  }
                  style={{ paddingLeft: 3 }}
                  color="#7BC9FF"
                ></Icon>
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
        }}
      >
        <ListItem.Content>
          <FlatList
            data={[...new Array(card.coffees_required)].map((_, i) =>
              i.toString()
            )}
            style={styles.list}
            columnWrapperStyle={{
              justifyContent: "space-around",
            }}
            numColumns={coffeesRequired}
            keyExtractor={(e) => e}
            renderItem={(index) => <Stampcard i={index} />}
          ></FlatList>

          <RedeemButton
            disabled={card.coffees_required == card.coffeesEarnt ? false : true}
            card={card}
          />
        </ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  );
}
const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "fit-content",
  },
  logo: {
    aspectRatio: 1,
    width: "15%",
    borderRadius: 5,
    border: 2,
  },
  stampbox: {
    aspectRatio: 1,
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 60,
    maxHeight: 60,
    position: "relative",
  },
});
