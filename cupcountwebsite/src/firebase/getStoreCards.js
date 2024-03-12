import app from "./firebaseConfig";
import {
  query,
  where,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import getCardStats from "../functions/getCardStats";

const db = getFirestore(app);

async function getStoreCards(storeid) {
  console.log(storeid);
  let storecards = [];

  const q = query(collection(db, "cards"), where("storeId", "==", storeid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    storecards.push(doc.data());
  });
  return getCardStats(storecards);
}

export default getStoreCards;
