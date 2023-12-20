import { View, Text, Pressable, Alert, Button } from "react-native";
import {
  createNewCard,
  updateUserCard,
  setCardComplete,
} from "../firebaseFunctions";
import { useState } from "react";

export function ConfirmCoffee({
  user,
  card,
  store,
  stampsToAdd,
  cardsComplete,
  navigation,
}) {
  const [showConfirmAlert, setShowConfirm] = useState(false);
  const onConfirm = () => {
    console.log(
      `stamps to add ${stampsToAdd} , card.coffees earnts ${card.coffeesEarnt}, coffees required ${store.coffees_required}`
    );
    let totalStamps = stampsToAdd + card.coffeesEarnt;
    let stampsRequired = store.coffees_required;
    let AddtoNewCard = totalStamps % stampsRequired;
    let completedCards = Math.floor(totalStamps / stampsRequired);

    if (completedCards == 0) {
      // updateUserCard(user.id, store.id, stampsToAdd);
      console.log(`no cards complete: adding ${stampsToAdd} to users card`);
    } else if (completedCards >= 1) {
      console.log(
        ` completeing users card and adding ${AddtoNewCard} to new card `
      );
      // updateUserCard(user.id, store.id, stampsRequired - card.coffeesEarnt);
      // createNewCard(user.id, store.id, AddtoNewCard);
      if (completedCards > 1) {
        console.log(`adding ${completedCards - 1} completed cards`);
        // addCompletedCards(user.id, store.id, completedCards - 1);
      }
    }
    navigation.navigate("Main Page");
  };

  return (
    <>
      <Pressable>
        <Button
          title="Stamp Card"
          onPress={() => setShowConfirm(true)}
        ></Button>
      </Pressable>
      <View>
        {showConfirmAlert && (
          <View>
            <Text>Confirm Stamp</Text>
            <Text>{`Add ${stampsToAdd} stamps to ${user.name}`}</Text>
            <Button title="Cancel"></Button>
            <Button title="Confirm" onPress={onConfirm}></Button>
          </View>
        )}
      </View>
    </>
  );
}
