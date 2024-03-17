import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import app from "./firebaseConfig";

const db = getFirestore(app);

export default async function updateStore(storeid, updateinfo) {
  const storeRef = doc(db, "stores", storeid);
  await updateDoc(storeRef, updateinfo);
  console.log("store updated");
}

export async function updatelogo(storeid, file) {
  const storage = getStorage();

  // Create a reference to the file to delete
  const storeRef = ref(storage, "stores", storeid);

  // Delete the file
  deleteObject(storeRef)
    .then(() => {
      // File deleted successfully
      uploadBytes(storeRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
}
