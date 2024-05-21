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
  querySnapshot.forEach(async (doc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data();
    data.storeId = doc.id;
    stores.push(data);
  });
  await Promise.all(
    stores.map(async (store, index) => {
      stores[index].logo = await getDownloadURL(ref(storage, store.logo));
    })
  );

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
  console.log("creating new card");
  console.log(userid, storeID, addStamps);
  let data = {
    points: addStamps,
    store_Id: storeID,
    redeemed: false,
    date_issued: new Date(),
  };
  const cardRef = collection(db, "users", userid, "loyalty_cards");
  const docRef = await addDoc(cardRef, data);
  // const docSnap = await updateDoc(doc(db, "users", userid), {
  //   cards: arrayUnion(docRef),
  // });
  data.cardID = docRef.id;
  console.log(`added ${storeID} card to user: ${userid}`);
  return data;
}
export async function updateUserCard(userid, cardId, AddStamps) {
  console.log(cardId);
  const cardRef = doc(db, "users", userid, "loyalty_cards", cardId);
  console.log(`${AddStamps} to ${cardId}`);
  await updateDoc(cardRef, {
    points: increment(AddStamps),
  });
  console.log(`added ${AddStamps} to ${cardId}`);
}
//No longer in use
// export async function AddCompleteCards(userid, storeid, stampsrequired) {
//   let data = {
//     coffeeEarnt: stampsrequired,
//     storeId: storeid,
//     userId: userid,
//   };
//   const cardRef = doc(db, "users", userid, loyalty_cards, cardId);
//   await updateDoc(cardRef, { completed: true });
// }

export async function getUserCard(userid, store) {
  const docSnap = await getDoc(doc(db, "users", userid));
  const userData = docSnap.data();
  console.log("User data snap");
  console.log(docSnap.data());
  console.log(store);
  try {
    const cardRef = collection(db, "users", userid, "loyalty_cards");

    const q = query(
      cardRef,
      where("store_Id", "==", store.storeId),
      where("redeemed", "==", false),
      where("points", "<", store.coffees_required)
    );
    const docSnap = await getDocs(q);
    if (docSnap.empty) {
      console.log(
        "No matching card found for the user in the specified store."
      );
      const card = await createNewCard(userid, store.storeId);
      console.log(card);
      return { card: card, username: userData };
    }
    const card = docSnap.docs[0].data();
    card["cardID"] = docSnap.docs[0].id;
    console.log(card);
    return { card: card, username: userData };
  } catch (error) {
    console.error("Error getting card:", error);
    throw error;
  }
}

export async function RedeemCard(userId, cardId, points_required, store_id) {
  const cardRef = doc(db, "users", userId, "loyalty_cards", cardId);

  const cardSnap = await getDoc(cardRef);
  console.log(userId, cardId, points_required, store_id);
  let cardData = cardSnap.data();
  console.log(cardData);
  if (cardSnap.empty) {
    return "Card not found";
  }
  if (cardData.store_Id != store_id) {
    return "Card is for the wrong store";
  }
  if (cardData.redeemed == true) {
    return "This card has already been redeemed";
  } else if (points_required > cardData.points) {
    return "Not Enough Points";
  } else if (points_required == cardData.points) {
    await updateDoc(doc(db, "users", userId), {
      coffee_earnt: increment(1),
    });
    await updateDoc(cardRef, { redeemed: true });
    console.log("Card redeemed");
    return "Card vaild, free drink earnt";
  } else return "error";
}
