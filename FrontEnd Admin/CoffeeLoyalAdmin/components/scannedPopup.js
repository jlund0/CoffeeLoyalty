import { View, Text, Button, Pressable } from "react-native";
import { getUser, getUserCard } from "../firebaseFunctions";
import { useState } from "react";
import FontistoIcon from "react-native-vector-icons/Fontisto";

export function ScannedPopUp({ userid, store }) {
  console.log(userid, store);
  const [changed, setChanged] = useState(false);
  const [addCoffees, setAddCoffees] = useState(0);
  const card = getUserCard(userid, store.id);
  const user = getUser(userid);
  console.log(card);
  console.log(user);
  // const [userCard, setUserCard] = useState(null);
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function fetchdata() {
  //     const card = await getUserCard(userid, store.id);
  //     const userdata = await getUser(userid);
  //     setUserCard(card);
  //     setUser(userdata);
  //   }
  //   fetchdata();
  // }, []);
  const stamplist = [...Array(store.coffees_required).keys()];
  const handleAdd = () => {
    console.log("adding coffee");
    setAddCoffees((prev) => prev + 1);
    setChanged(true);
  };

  return (
    <View>
      <Text>Customer Details</Text>
      <Text>Name: {user.name}</Text>
      <Text>Stamp Card</Text>
      <Pressable
        onPress={() => {
          handleAdd;
        }}
      >
        {stamplist.map((i) => {
          return (
            <View style={{}} key={i}>
              <View>
                {i < card.coffeesEarnt + addCoffees ? (
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
        {changed && <Button onPress={() => setAddCoffees(0)}>Undo</Button>}
      </Pressable>
      <Text>Coffees Added: {addCoffees}</Text>
    </View>
  );
}
