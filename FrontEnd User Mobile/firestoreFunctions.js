import { app } from "./firebase";
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
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import * as geofire from "geofire-common";
import { stampPushNotification } from "./notifications";
import { sortListbyDistance } from "./useful-functions";

const db = getFirestore(app);
const storage = getStorage(app);

export async function AddUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { displayName, email, uid } = user;
  console.log(`adding user ${displayName}`);
  console.log(displayName, email, uid);

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
      uid: uid,
      created: serverTimestamp(),
      coffees_earnt: 0,
    };
    await setDoc(doc(db, "users", uid), userData);
    console.log("Document written with ID: ", docRef.id);
    return userData;
  }
}

export async function getUserInfo() {
  console.log("getUserInfo");
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(`fetching ${user.uid} details`);
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  let cards = [];
  let dataUser;
  if (docSnap.exists()) {
    dataUser = docSnap.data();
    dataUser.uid = docSnap.id;

    cards = await getCards(user);
  } else {
    console.log("No user found adding user");
    dataUser = await AddUser(user);
  }
  // console.log("User Info");
  // console.log(dataUser);
  console.log("Card Info");
  console.log(cards);
  cardListener(user.uid);

  return { userdata: dataUser, cardsdata: cards };
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

export async function getCards(user) {
  console.log("getCards");
  console.log("fetching " + user.uid + " cards");
  const q = query(
    collection(db, "users", user.uid, "loyalty_cards"),
    where("redeemed", "==", false)
  );
  const cardsSnap = await getDocs(q);
  let cards = [];
  cardsSnap.forEach((cardData) => {
    console.log(cardData.id, " => ", cardData.data());
    let card = cardData.data();
    card.cardId = cardData.id;
    cards.push(card);
  });

  await Promise.all(
    cards.map(async (card, index) => {
      const cardDoc = await getDoc(doc(db, "stores", card.store_Id));
      if (cardDoc.exists) {
        let cardData = cardDoc.data();
        cardData.logo = await getDownloadURL(ref(storage, cardData.logo));
        cards[index] = { ...card, ...cardData };
      }
    })
  );

  console.log(cards);
  return cards;
}

function cardListener(userId) {
  const q = query(collection(db, "users", userId, "loyalty_cards"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New Card: ", change.doc.data());
      }
      if (change.type === "modified") {
        console.log(change);
        console.log("Card Changed: ", change.doc.data());
        stampPushNotification();
      }
      if (change.type === "removed") {
        console.log("Card Deleted: ", change.doc.data());
      }
    });
  });
}
