import app from "./firebase";
import {
  collection,
  doc,
  addDoc,
  getFirestore,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  QueryStartAtConstraint,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import { Image } from "react-native";
const db = getFirestore(app);
const storage = getStorage(app);

export async function AddUser(name, email, id) {
  console.log(`adding user ${id}`);
  console.log(name, email, id);

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("user already added with");
    console.log("Document data:", docSnap.data());
  } else {
    console.log("adding user " + id);
    const userData = {
      name: name,
      email: email,
      coffee_earnt: 0,
      created_at: new Date(),
    };
    try {
      const docRef = setDoc(doc(db, "users", id), userData);
      console.log("User written with ID: ", id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export async function getUserInfo() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(`fetching ${user.uid} details`);
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let data = docSnap.data();
    data.userId = docSnap.id;
    console.log("Users data:", data);
    return data;
  } else {
    console.log("No such document!");
  }
}

export async function getUserCards() {
  const cards = [];
  const auth = getAuth();
  const user = auth.currentUser;
  // const user = auth.currentUser;
  console.log(`fetching ${user.uid} cards`);
  const querySnapshot = await getDocs(
    collection(db, "users", user.uid, "cards")
  );
  querySnapshot.forEach(async (doc) => {
    const cardInfo = doc.data();
    const data = await getStoreInfo(cardInfo.store);
    data.coffees_purchased = cardInfo.coffees_purchased;
    data.cardid = doc.id;
    cards.push(data);
  });
  console.log("users cards:");
  console.log(cards);
  return cards;
}

export async function getStoreInfo(storeref) {
  let docSnap = await getDoc(storeref);
  let logo = await getStoreLogo(docSnap.id);
  console.log("fetching store info");
  if (docSnap.exists()) {
    console.log("Store data:", docSnap.data());
    let data = docSnap.data();
    data.coffeeId = docSnap.id;
    data.logo = logo;
    return data;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

// export function getStores(filter) {
//   console.log(`fetching stores in filter ${filter}`);
// }

// export function addCard(cardid, userid) {
//   console.log("adding card with" + cardid + "to" + userid);
// }

export async function getStoreLogo(storeid) {
  console.log("getting store logo: " + storeid);

  let imageurl = await getDownloadURL(
    ref(storage, `STORES/${storeid}/logo.png`)
  );
  console.log("logo url: " + imageurl);
  return imageurl;
}
