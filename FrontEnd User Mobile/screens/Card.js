import { View, Image, Text, StyleSheet } from "react-native";
import NavBar from "../components/NavBar";
import { useIsFocused } from "@react-navigation/native";

export default function Card({ navigation }) {
  /* List of loyality cards customer has  
  cards = [{name: "store name", points: "points", pointsTotat:"total" , image: "image", stamp: "stamp"}] 
  */
  // let cards = [
  //   {
  //     name: "store name",
  //     storelogo: "img",
  //     points: "points",
  //     pointsTotal: "total",
  //     image: "image",
  //     stamp: "stamp",
  //     address: "address",
  //   },
  // ];
  return (
    <View>
      {/* {cards.map((card) => (
        <View style={styles.cards}>
          <Image source={require(card.storelogo)} />
          <Text style={styles.cardname}>{card.name}</Text>
          <Text style={styles.cardpoints}>
            {card.points}/{card.pointsTotal}
          </Text>
        </View>
      ))} */}
      <NavBar navigation={navigation} isFocused={isFocused ? "main" : null} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  cardpoints: {},
  pointsTotal: {},
  cardname: {},
  cards: {},
});
