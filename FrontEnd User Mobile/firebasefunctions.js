import app from "./firebase";
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
const db = getFirestore(app);
const storage = getStorage(app);

export async function AddUser(user, name) {
  const { displayName, email, uid } = user;
  console.log(displayName, email, uid);
  console.log(`adding user ${displayName}`);
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("user already added with");
    console.log("Document data:", docSnap.data());
  } else {
    console.log("adding user " + uid);
    const userData = {
      name: displayName,
      email: email,
      coffee_earnt: 0,
      created_at: serverTimestamp(),
      role: "customer",
    };
    try {
      setDoc(doc(db, "users", uid), userData);
      console.log("User written with ID: ", uid);
      return userData;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export async function getUserInfo() {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("getting user info");
  console.log(user);
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
    const data = await AddUser(user);
    return data;
  }
}

export async function getUserCards() {
  const cards = [];
  const auth = getAuth();
  const user = auth.currentUser;
  const completeCards = [];
  // const user = auth.currentUser;
  console.log(`fetching ${user.uid} cards`);
  const querySnapshot = await getDocs(
    collection(db, "users", user.uid, "cards")
  );
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.cardId = doc.id;
    cards.push(data);
  });
  for (let card of cards) {
    let storedata = await getStoreInfo(card.store);
    completeCards.push(Object.assign({}, storedata, card));
  }
  console.log("users cards:");
  console.log(completeCards);
  return completeCards;
}

export async function getStoreInfo(storeref) {
  let docSnap = await getDoc(storeref);
  console.log("store ref: ");
  console.log(docSnap.id);

  console.log("fetching store info");
  if (docSnap.exists()) {
    let logo = await getDownloadURL(
      ref(storage, `STORES/${docSnap.id}/logo.png`)
    );
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
