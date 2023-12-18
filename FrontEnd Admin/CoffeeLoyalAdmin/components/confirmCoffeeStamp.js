import { View, Text, Pressable, Alert, Button } from "react-native";
import {
  createNewCard,
  updateUserCard,
  setCardComplete,
} from "../firebaseFunctions";
import { useState } from "react";

export function ConfirmCoffee(user, card, store, stampsToAdd) {
  const [showConfirmAlert, setShowConfirm] = useState(false);
  const onConfirm = () => {
    if (stampsToAdd + currentStamps >= stampsRequired) {
      const addToNewCard = stampRequired - (stampsToAdd + stampsEarnt);
      console.log("adding new card");
      createNewCard(user.id, store.id, addToNewCard);
      updateUserCard(stampRequired, card.id);
      setCardComplete(card.id);
    } else if (stampsToAdd + currentStamps < stampsRequired) {
      updateUserCard(stampsToAdd);
    }
  };

  return (
    <>
      <Pressable title="Stamp Card" onPress={() => setShowConfirm(true)}>
        <Button title="Stamp Card"></Button>
      </Pressable>
      <View>
        {showConfirmAlert && (
          <Alert
            title="Confirm Stamp"
            message={`Are you sure you want to stamp ${user.name} with ${stampsToAdd} stamps?`}
            buttons={[
              { text: "Cancel", onPress: () => setShowConfirm(false) },
              { text: "Stamp", onPress: () => setShowConfirm(false) },
            ]}
          />
        )}
      </View>
    </>
  );
}
