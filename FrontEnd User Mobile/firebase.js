import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwxx4oNlaE19Q4X0enF8HaZUvRU4GF3n8",
  authDomain: "loyal-coffee-bad9d.firebaseapp.com",
  projectId: "loyal-coffee-bad9d",
  storageBucket: "loyal-coffee-bad9d.appspot.com",
  messagingSenderId: "596303599486",
  appId: "1:596303599486:web:5b3d1d550c2eb49e07452f",
  measurementId: "G-BLBY6WGBR6",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default app;
