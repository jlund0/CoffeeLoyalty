import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from "react-native";
import { getUser, getUserCard } from "../firebaseFunctions";
import { useState, useEffect } from "react";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { ConfirmCoffee } from "./confirmCoffeeStamp";
import { TouchableOpacity, Dimensions } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// export function ScannedPopUp({ userid, store, navigation , route }) {
import AddStamps from "./stampadder";

export function ScannedPopUp({ route, navigation }) {
  const { userid, store } = route.params;
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
  const confirmComplete = () => {
    console.log("adding stamps to cards confirm complete");
    let stampsRequired = store.coffees_required;
    let coffeesEarnt = userCard.coffeesEarnt;
    console.log(user);
    console.log(userCard);
    const id = {
      userid: user.userID,
      storeid: store.id,
      cardid: userCard.cardID,
    };
    AddStamps(id, addCoffees, coffeesEarnt, stampsRequired);
    navigation.navigate("Success");
  };
  return (
    <View style={styles.mainContainer}>
      {/* <Text style={styles.text}> Stamp Card</Text> */}
      <Pressable style={styles.card} onPress={handleAdd}>
        <View style={styles.namebox}>
          <Text style={[styles.text]}>
            NAME: <Text style={[styles.name]}>{user.name}</Text>
          </Text>
        </View>
        <Image source={{ uri: store.logo }} style={styles.storelogo} />
        <View style={styles.stampBox}>
          {stamplist.map((i) => {
            return (
              <View style={styles.stamps} key={i}>
                {/* {i < userCard.coffeesEarnt + addCoffees ? ( */}

                {i < stampCardCount ? (
                  <FontAwesomeIcon name="coffee" size={75} color="#6F4E37" />
                ) : (
                  <View stlye={styles.stamp}></View>
                )}
              </View>
            );
          })}
        </View>

        {/* <View style={{borderWidth:6,alignItems:'center',width:80,height:80}}>
        <Text style={{textAlign:"center",fontStyle:"bold"}}>Free</Text><Text style={{textAlign:"center",fontStyle:"bold"}}>Coffee</Text></View>  */}
      </Pressable>

      {/* <Text style={styles.text}>Stamps: {addCoffees}</Text> */}
      {/* {cardsCompleted > 0 && <Text style={styles.text}>Cards completed: {cardsCompleted}</Text>} */}
      <View style={{ rowGap: 10 }}>
        <View style={{ flexDirection: "row", maxWidth: "100%", columnGap: 10 }}>
          <Confirm
            stamps={addCoffees}
            name={user.name}
            confirmComplete={confirmComplete}
          />
          {/* <ConfirmCoffee
          user={user}
          card={userCard}
          store={store}
          stampsToAdd={addCoffees}
          cardsCompleted={cardsCompleted}
          navigation={navigation}
        /> */}
          {changed && (
            <Pressable
              onPress={() => onUndoPress()}
              style={{
                borderRadius: 20,
                backgroundColor: "#c08552",
                alignSelf: "center",
                height: "100%",
                padding: 10,
                paddingHorizontal: 15,
              }}
            >
              <FontAwesomeIcon name="undo" size={40} />
            </Pressable>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Main Page")}>
          <Text
            style={{
              textDecorationLine: "underline",
              fontSize: 30,
              textAlign: "center",
              color: "grey",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Confirm({ stamps, name, confirmComplete }) {
  const alert = () => {
    Alert.alert("Confirm Stamps", `Stamp ${name} ${stamps} times`, [
      {
        text: "Yes",
        onPress: () => confirmComplete(),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };

  const webAlert = () => {
    const result = window.confirm(
      ["Confirm", `Stamp ${name} ${stamps} times`].filter(Boolean).join("\n")
    );

    if (result) {
      confirmComplete();
    }
  };
  return (
    <Pressable
      style={styles.stampbutton}
      onPress={Platform.OS === "web" ? webAlert : alert}
      title="Stamp"
    >
      <Text style={{ textAlign: "center", fontSize: 30 }}>Stamp Card</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  customerDetails: { fontStyle: "bold" },
  card: {
    rowGap: 20,
    borderRadius: 30,
    width: "100%",
    flex: 4,
    backgroundColor: "#DAB49D",
    padding: 10,
  },
  namebox: {
    marginTop: 20,
    backgroundColor: "#F3E9DC",
    flex: 1,

    borderRadius: 20,
    width: "auto",
    justifyContent: "center",

    marginHorizontal: 20,
  },
  stamps: {
    width: 100,
    height: 100,
    backgroundColor: "#F3E9DC",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
  },
  stampBox: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    alignContent: "space-around",
    gap: 50,
    paddingHorizontal: 40,
    paddingVertical: 20,
    flex: 6,
  },
  text: {
    fontSize: 35,
    textAlign: "center",
    color: "#5E3023",
    fontWeight: "bold",
  },
  name: { textTransform: "capitalize" },
  stampbutton: {},
  mainContainer: {
    flex: 1,
    padding: 30,
    justifyContent: "space-around",
    rowGap: 30,
    paddingBottom: 50,
  },
  storelogo: {
    position: "absolute",
    width: "80%",
    height: "80%",
    maxHeight: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
    opacity: 0.5,
    alignSelf: "center",
    top: "15%",
    zIndex: -1,
  },
  stampbutton: {
    borderRadius: 20,
    backgroundColor: "#c08552",
    alignSelf: "center",
    width: "100%",
    padding: 15,
    flex: 1,
  },
});
