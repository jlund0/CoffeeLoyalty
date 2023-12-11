import { app } from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  where,
  query,
  getDoc,
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
  const cardRef = collection(db, "cards");
  const q = query(
    cardRef,
    where("user", "==", userid),
    where("shop", "==", storeid)
  );
  const docSnap = await getDocs(q);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
  }
}

export async function getUser(userid) {
  const docSnap = await getDocs(doc(db, "users", userid));
  console.log(docSnap.data());
}
