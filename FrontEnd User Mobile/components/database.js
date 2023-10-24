import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

// Replace the uri string with your MongoDB deployment's connection string.
const db = getFirestore(app);

export async function NewUser(user) {
  console.log("database " + user);

  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function getUser() {}

function updateUser() {}

function deleteUser() {}

function getUsersCards() {}

function GetShops() {}
