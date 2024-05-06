import app from "./firebase";
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  startAt,
  endAt,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import * as geofire from "geofire-common";
import { sortListbyDistance } from "./useful-functions";
import { stampPushNotification, cardPushNotifcation } from "./notifications";
import auth from "./firebase";

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
      cards: [],
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
  let auth = getAuth();
  const user = auth.currentUser;
  console.log(`fetching ${user.uid} details`);
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  cardListener(docRef);
  if (docSnap.exists()) {
    let data = docSnap.data();
    data.userId = docSnap.id;
    let cards = await getCards(data.cards);
    // cardUpdateListener(data.cards);
    return { userdata: data, cardsdata: cards };
  } else {
    console.log("No user found adding user");
    const data = await AddUser(user);
    let cards = [];

    return { userdata: data, cardsdata: cards };
  }
}

export async function getCards(cardRefs) {
  let cards = [];
  await Promise.all(
    cardRefs.map(async (cardRef) => {
      const cardDoc = await getDoc(cardRef, where("active", "==", true));
      if (cardDoc.exists) {
        cards.push({ cardId: cardDoc.id, ...cardDoc.data() });
      }
    })
  );
  for (index in cards) {
    let storedata = await getStoreInfo(cards[index].storeId);
    cards[index] = Object.assign({}, storedata, cards[index]);
  }

  // console.log(cards);
  return cards;
}

//no longer in use remove
// export async function getUserCards() {
//   const cards = [];
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const completeCards = [];
//   // const user = auth.currentUser;
//   // console.log(`fetching ${user.uid} cards`);
//   const querySnapshot = await getDocs(
//     query(collection(db, "cards"), where("userId", "==", user.uid))
//   );

//   querySnapshot.forEach((doc) => {
//     const data = doc.data();
//     data.cardId = doc.id;
//     cards.push(data);
//   });
//   console.log(cards);
//   for (let card of cards) {
//     let storedata = await getStoreInfo(card.storeId);
//     completeCards.push(Object.assign({}, storedata, card));
//   }
//   console.log("users cards:");
//   console.log(completeCards);
//   cardUpdateListener(cardRefs);
//   return completeCards;
// }

export async function getCardLogo(logo) {
  return await getDownloadURL(ref(storage, logo));
}

export async function getStoreInfo(storeId) {
  let docSnap = await getDoc(doc(db, "stores", storeId));
  if (docSnap.exists()) {
    let logo = await getDownloadURL(ref(storage, docSnap.data().logo));
    let data = docSnap.data();
    data.storeId = docSnap.id;
    data.logo = logo;
    return data;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function getStoreLogo(storeid) {
  console.log("getting store logo: " + storeid);

  let imageurl = await getDownloadURL(
    ref(storage, `STORES/Logos/${storeid}.jpg`)
  );
  return imageurl;
}

export async function getStores(lat, lng) {
  const center = [lat, lng];
  const bounds = geofire.geohashQueryBounds(center, 2000);
  const radiusInM = 5000;

  const promises = [];
  for (const b of bounds) {
    const q = query(
      collection(db, "stores"),
      orderBy("geohash"),
      startAt(b[0]),
      endAt(b[1])
    );

    promises.push(getDocs(q));
  }

  // Collect all the query results together into a single list
  const snapshots = await Promise.all(promises);

  const matchingDocs = [];
  for (const snap of snapshots) {
    for (const doc of snap.docs) {
      const coords = await doc.get("coords");
      const lat = coords.latitude;
      const lng = coords.longitude;
      console.log(lat, lng);
      // We have to filter out a few false positives due to GeoHash
      // accuracy, but most will match
      const distanceInKm = geofire.distanceBetween([lat, lng], center);
      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        let data = doc.data();
        data.distanceAway = distanceInM;
        matchingDocs.push(data);
      }
    }
  }
  return matchingDocs;
}

export async function updateUserinfo(userid, updateInfo) {
  const userRef = doc(db, "users", userid);
  await updateDoc(userRef, updateInfo);
}

function cardListener(docSnap) {
  const unsub = onSnapshot(docSnap, (doc) => {
    console.log("Current data: ", doc.data());
  });
  return;
}

//CardUpdate Listener
export function cardUpdateListener(cardRefs) {
  const unsubscribe = onSnapshot(cardRefs, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "modified") {
        console.log("card changes");
        console.log(change.doc.data());
        stampPushNotification(8, "Store");
      }
    });
  });
  return;
}

export function resetPassword(email) {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
