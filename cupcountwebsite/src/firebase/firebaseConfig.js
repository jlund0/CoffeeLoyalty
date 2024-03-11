import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCwxx4oNlaE19Q4X0enF8HaZUvRU4GF3n8",

  authDomain: "loyal-coffee-bad9d.firebaseapp.com",

  projectId: "loyal-coffee-bad9d",

  storageBucket: "loyal-coffee-bad9d.appspot.com",

  messagingSenderId: "596303599486",

  appId: "1:596303599486:web:5b3d1d550c2eb49e07452f",

  measurementId: "G-BLBY6WGBR6",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export default app;
