import { app } from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  updateDoc,
  setDoc,
  increment,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;
const storage = getStorage();

export async function getStores(userid) {
  let stores = [];
  const q = query(collection(db, "stores"), where("owner", "==", userid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data();
    data.storeId = doc.id;
    data.logo = getStoreLogoUrl(doc.data().logo);
    stores.push(data);
  });
  // for (let store in stores) {
  //   stores[store].logo = await getStoreLogoUrl(stores[store].logo);
  // }
  console.log(stores);
  return stores;
}

export async function getStoreLogoUrl(url) {
  let imageurl = await getDownloadURL(ref(storage, url));
  return imageurl;
}

export async function getUser(userid) {
  console.log("getUser function");
  const docSnap = await getDoc(doc(db, "users", userid));
  const userData = docSnap.data();

  userData["userID"] = docSnap.id;
  console.log(docSnap.data());
  return userData;
}

export async function createNewCard(userid, storeID, addStamps = 0) {
  let data = {
    coffeesEarnt: addStamps,
    completed: false,
    storeId: storeID,
    userId: userid,
    redeemed: false,
    active: true,
  };
  const cardRef = collection(db, "cards");
  const docRef = await addDoc(cardRef, data);
  const docSnap = await updateDoc(doc(db, "users", userid), {
    cards: arrayUnion(docRef.id),
  });
  data["cardID"] = docRef.id;
  console.log(`added card with ${data} to user: ${userid}`);
  return data;
}
export async function updateUserCard(cardId, AddStamps, completed = false) {
  console.log(cardId);
  const cardRef = doc(db, "cards", cardId);
  console.log(`${AddStamps} to ${cardId}`);
  completed
    ? await updateDoc(cardRef, {
        completed: true,
        coffeesEarnt: increment(AddStamps),
      })
    : await updateDoc(cardRef, { coffeesEarnt: increment(AddStamps) });
  console.log(`added ${AddStamps} to ${cardId}`);
}

export async function AddCompleteCards(userid, storeid, stampsrequired) {
  let data = {
    coffeeEarnt: stampsrequired,
    storeId: storeid,
    userId: userid,
  };
  const cardRef = doc(db, "cards", cardId);
  await updateDoc(cardRef, { completed: true });
}
export async function getUserCard(userid, storeID) {
  console.log("userid: " + userid + "  storeid: " + storeID);

  try {
    const cardRef = collection(db, "cards");
    const q = query(
      cardRef,
      where("userId", "==", userid),
      where("storeId", "==", storeID),
      where("completed", "==", false)
    );
    const docSnap = await getDocs(q);
    if (docSnap.empty) {
      console.log(
        "No matching card found for the user in the specified store."
      );

      return await createNewCard(userid, storeID);
    }
    const card = docSnap.docs[0].data();
    card["cardID"] = docSnap.docs[0].id;
    console.log(card.cardID);
    console.log(card);
    return card;
  } catch (error) {
    console.error("Error getting card:", error);
    throw error;
  }
}

export async function getStore(storeid) {
  console.log("getStore function");
  console.log(storeid);
  const docSnap = await getDoc(doc(db, "stores", storeid));
  const storeData = docSnap.data();
  storeData["storeID"] = docSnap.id;
  storeData["logo"] = await getStoreLogoUrl(storeData.logo);
  console.log(docSnap.data());
  return storeData;
}
