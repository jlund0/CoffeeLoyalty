import { async } from "@firebase/util";
import app from "./firebase";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(app);

export function AddUser(userDetails) {
  console.log("adding user" + userDetails);
  try {
    const docRef = addDoc(collection(db, "users"), userDetails);
    console.log("User written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUserInfo(userid) {
  console.log(`fetching ${userid} details`);
  const docRef = doc(db, "user", userid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Users data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function getUserCards(userid) {
  let cards = [];
  console.log(`fetching ${userid} cards`);
  const q = query(collection(db, "cards"), where("user", "==", userid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    cards.push(doc.data());
  });
  console.log("users cards" + cards);
  return cards;
}

export function getStoreInfo(storeid) {
  console.log(`fetching ${storeid} info`);
}

export function getStores(filter) {
  console.log(`fetching stores in filter ${filter}`);
}

export function addCard(cardid, userid) {
  console.log("adding card with" + cardid + "to" + userid);
}
