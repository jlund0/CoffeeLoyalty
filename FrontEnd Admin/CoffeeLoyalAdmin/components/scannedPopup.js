import { View, Text, Button } from "react-native";
import { getUser, getUserCard } from "../firebaseFunctions";

export function ScannedPopUp({ userid, storeid }) {
  console.log(userid, storeid);

  const card = getUserCard(userid, storeid);
  const user = getUser(userid);
  const customerName = "julian";
  const currentcard = "1234";
  return <View></View>;
}
