import app from "./firebaseConfig";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";

const db = getFirestore(app);
async function getStores(storeRefs) {
  console.log(storeRefs);
  let stores = [];
  await Promise.all(
    storeRefs.map(async (storeRef) => {
      const store = await getDoc(storeRef);
      let data = store.data();
      data.id = store.id;
      stores.push(data);
    })
  );
  console.log(stores);
  return stores;
}

export default getStores;
