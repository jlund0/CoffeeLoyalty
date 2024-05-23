import app from "./firebaseConfig";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const db = getFirestore(app);

async function getStores(id) {
  const userSnap = await getDoc(doc(db, "owners", id));
  let stores = [];
  await Promise.all(
    userSnap.data().stores.map(async (storeRef) => {
      const store = await getDoc(storeRef);
      let data = store.data();
      data.id = store.id;
      data.logo = await getDownloadURL(ref(storage, data.logo));
      stores.push(data);
    })
  );
  console.log(stores);
  return stores;
}

export default getStores;
