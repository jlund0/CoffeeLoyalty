import { getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { doc } from "firebase/firestore";
import app from "./firebaseConfig";
const db = getFirestore(app);

async function getUserInfo(userid) {
  const docRef = doc(db, "owners", userid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
export default getUserInfo;
