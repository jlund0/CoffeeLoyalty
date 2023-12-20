import { View, Text, Button, Pressable, Alert } from "react-native";
import { getUser, getUserCard } from "../firebaseFunctions";
import { useState, useEffect } from "react";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { ConfirmCoffee } from "./confirmCoffeeStamp";

// export function ScannedPopUp({ userid, store, navigation , route }) {
export function ScannedPopUp({route ,navigation }) {
  const {userid , store} = route.params;
  const [changed, setChanged] = useState(false);
  const [addCoffees, setAddCoffees] = useState(0);
  const [userCard, setUserCard] = useState(null);
  const [user, setUser] = useState(null);
  const [cardsCompleted, setCardsCompleted] = useState(0);
  const [stampCardCount, setStampCardCount] = useState(0);
  useEffect(() => {
    async function fetchdata() {
      const card = await getUserCard(userid, store.id);
      const userdata = await getUser(userid);
      setUserCard(card);
      setUser(userdata);
      setStampCardCount(card.coffeesEarnt);
    }
    fetchdata();
  }, []);
  const stamplist = [...Array(store.coffees_required).keys()];
  const handleAdd = () => {
    console.log("adding coffee");
    setAddCoffees((prev) => prev + 1);
    setStampCardCount(stampCardCount + 1);
    setChanged(true);

    if ((addCoffees + userCard.coffeesEarnt) % store.coffees_required == 0) {
      setCardsCompleted(cardsCompleted + 1);
      setStampCardCount(1);
    }
  };
  if (user == null || userCard == null) {
    return null;
  }

  const onUndoPress = () => {
    setAddCoffees(0);
    setChanged(false);
    setStampCardCount(userCard.coffeesEarnt);
    setCardsCompleted(0);
  };
  return (
    <View>
      <Text>Customer Details</Text>
      <Text>Name: {user.name}</Text>
      <Text>Stamp Card</Text>
      <Pressable onPress={handleAdd}>
        {stamplist.map((i) => {
          return (
            <View style={{}} key={i}>
              <View>
                {/* {i < userCard.coffeesEarnt + addCoffees ? ( */}
                {i < stampCardCount ? (
                  <FontistoIcon
                    name="checkbox-active"
                    style={{
                      width: 80,
                      height: 80,
                    }}
                  />
                ) : (
                  <FontistoIcon
                    name="checkbox-passive"
                    style={{
                      width: 80,
                      height: 80,
                    }}
                  />
                )}
              </View>
            </View>
          );
        })}
        {changed && (
          <Button onPress={() => onUndoPress()} title="Undo"></Button>
        )}
      </Pressable>
      <Text>Stamps Added: {addCoffees}</Text>
      <Text>Cards completed: {cardsCompleted}</Text>
      <ConfirmCoffee
        user={user}
        card={userCard}
        store={store}
        stampsToAdd={addCoffees}
        cardsCompleted={cardsCompleted}
        navigation={navigation}
      />
    </View>
  );
}
