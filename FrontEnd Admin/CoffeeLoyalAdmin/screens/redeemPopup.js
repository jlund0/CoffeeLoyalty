import { useState, useEffect } from "react";
import { View, Text, Pressable, Alert, StyleSheet } from "react-native";
import { RedeemCard } from "../firebaseFunctions";

export function RedeemPopup({ navigation, route }) {
  const { userId, cardId, points_required, store_Id } = route.params;
  const [cardStatus, setCardStatus] = useState();

  console.log("redeem popup");

  const fetchCardStatus = async () => {
    let cardData = await RedeemCard(userId, cardId, points_required, store_Id);
    setCardStatus(cardData);
  };

  useEffect(() => {
    fetchCardStatus();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{cardStatus}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textStyle}>Okay</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
