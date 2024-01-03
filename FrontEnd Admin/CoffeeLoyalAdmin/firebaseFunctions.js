import { app } from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  where,
  query,
  getDoc,
  updateDoc,
  setDoc,
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
    console.log(doc.id, " => ", doc.data());
    let data = doc.data();
    data.id = doc.id;
    stores.push(data);
  });
  console.log(stores);
  for (let store in stores) {
    stores[store].logo = await getStoreLogoUrl(stores[store].logo);
  }
  return stores;
}

export async function getStoreLogoUrl(url) {
  let imageurl = await getDownloadURL(ref(storage, url));
  return imageurl;
}

export async function getUserCard(userid, storeid) {
  console.log("userid: " + userid + "  storeid: " + storeid);
  try {
    const cardRef = collection(db, "cards");
    const q = query(
      cardRef,
      where("userId", "==", userid),
      where("storeId", "==", storeid)
    );
    const docSnap = await getDocs(q);
    if (docSnap.empty) {
      console.log(
        "No matching card found for the user in the specified store."
      );
      return null; // or handle accordingly
    }
    const card = docSnap.docs[0].data();
    return card;
  } catch (error) {
    console.error("Error getting card:", error);
    throw error;
  }
}

export async function getUser(userid) {
  const docSnap = await getDoc(doc(db, "users", userid));
  console.log(docSnap.data());
  return docSnap.data();
}

export async function createNewCard(userid, storeid, addStamps = 0) {
  let data = {
    coffeeEarnt: addStamps,
    completed: false,
    storeId: storeid,
    userId: userid,
  };
  const cardRef = collection(db, "cards");
  await setDoc(doc(cardRef), data);
  console.log(`added card with ${data} to user: ${userid}`);
}
export async function updateUserCard(AddStamps, cardId) {
  const cardRef = collection(db, "cards", cardId);
  await updateDoc(cardRef, { coffeesEarnt: increment(AddStamps)});
  console.log(`added ${AddStamps} to ${cardId}`);
}

export async function AddCompleteCards(userid,storeid,stampsrequired) {
  let data={
    coffeeEarnt: stampsrequired,
    storeId: storeid,
    userId: userid,
  }
  const cardRef = doc(db, "cards", cardId);
  await updateDoc(cardRef, { completed: true });
}
