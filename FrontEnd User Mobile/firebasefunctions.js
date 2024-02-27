import app from "./firebase";
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,query, orderBy, startAt, endAt,where
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import * as geofire from "geofire-common"
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
  // console.log(`fetching ${user.uid} cards`); 
  const querySnapshot = await getDocs(query(collection(db, "cards"), where("userId" , "==", user.uid)))
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.cardId = doc.id;
    cards.push(data);
  });
  console.log(cards)
  for (let card of cards) {
    let storedata = await getStoreInfo(card.storeId);
    completeCards.push(Object.assign({}, storedata, card));
  }
  console.log("users cards:");
  console.log(completeCards);
  return completeCards;
}

export async function getStoreInfo(storeId) {
  let docSnap = await getDoc(doc(db,"stores",storeId));
  console.log("store ref: ");
  console.log(docSnap.id);

  console.log("fetching store info");
  if (docSnap.exists()) {
    let logo = await getDownloadURL(
      ref(storage, docSnap.data().logo)
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
    ref(storage, `STORES/Logos/${storeid}.jpg`)
  );
  // console.log("logo url: " + imageurl);
  return imageurl;
}



export async function getStores(lat,lng,distance=1){
  const center = [lat,lng]
  const bounds = geofire.geohashQueryBounds(center,2000);
  const radiusInM = distance * 1000;

const promises = [];
for (const b of bounds) {
  const q = query(
    collection(db, 'stores'), 
    orderBy('geohash'), 
    startAt(b[0]), 
    endAt(b[1]));

  promises.push(getDocs(q));
}
// Collect all the query results together into a single list
const snapshots = await Promise.all(promises);
const matchingDocs = [];

for (const snap of snapshots) {
  for (const doc of snap.docs) {
    const coords = doc.get('coords');
    // We have to filter out a few false positives due to GeoHash
    // accuracy, but most will match
    const distanceInKm = geofire.distanceBetween([coords.latitude, coords.longitude], center);
    
    const distanceInM = distanceInKm * 1000;
    if (distanceInM <= radiusInM) {
     const data=doc.data()
     data["distanceAway"] = distanceInM
     data["id"]= doc.id
     data["logo"] = await getDownloadURL(
      ref(storage, data.logo)
    );
      matchingDocs.push(data);
      
    }
  }
  console.log(matchingDocs)
  
  return(matchingDocs.sort((p1,p2)=>{(p1.distanceAway > p2.distanceAway) ? 1 : (p1.distanceAway < p2.distanceAway) ? -1 : 0}))

}}
