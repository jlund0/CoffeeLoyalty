import app from "./firebaseConfig";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const AddUserToFirestore = async (user) => {
  console.log(user);
  const data = {
    email: user.email,
    name: user.displayName,
    stores: [],
  };

  await setDoc(doc(db, "owners", user.uid), data);
  console.log("added user to owners");
};

export default AddUserToFirestore;
