import {
  getAuth,
  updateProfile,
  updateEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "./firebase.config";

const auth = getAuth(app);

export function updatePassword(email = auth.currentUser) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export function updateUserInfo(data) {
  updateProfile(auth.currentUser, data)
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
}

export function updateUserEmail(email) {
  updateEmail(auth.currentUser, "user@example.com")
    .then(() => {
      // Email updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
}
export function deleteUser() {
  auth.currentUser
    .delete()
    .then(() => {
      // User deleted.
    })
    .catch((error) => {
      // An error ocurred
      // ...
    });
}
