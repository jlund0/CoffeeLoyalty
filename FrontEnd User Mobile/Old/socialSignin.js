import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithCredential,
} from "firebase/auth";
import { app } from "../firebase";
import { FacebookSVG, TwitterSVG, GoogleSVG } from "../assets/socialSVG";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { AddUser } from "../firebasefunctions";

const auth = getAuth(app);
auth.languageCode = "it";

const TwitterProvider = new TwitterAuthProvider();
const FacebookProvider = new FacebookAuthProvider();
const GoogleProvider = new GoogleAuthProvider();

// Build Firebase credential with the Google ID token.
// const credential = GoogleAuthProvider.credential(id_token);

// // Sign in with credential from the Google user.

// signInWithCredential(auth, credential).catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.customData.email;
//   // The AuthCredential type that was used.
//   const credential = GoogleAuthProvider.credentialFromError(error);
//   // ...
// });

const HandleGmailLogin = ({}) => {
  console.log("Login in Gmail");

  signInWithPopup(auth, GoogleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      AddUser(user.displayName, user.email, user.uid);

      console.log("Logged in with:", user.email, user, token);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
const HandleFacebookLogin = () => {
  console.log("Login in Facebook");
  signInWithPopup(auth, FacebookProvider)
    .then((result) => {
      const credential = FacebookProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      AddUser({
        created_at: new Date(),
        userID: user.uid,
        name: user.displayName,
        email: user.email,
        earnt_coffees: 0,
      });

      console.log("Logged in with:", user.email, user, token);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
const HandleTwitterLogin = () => {
  console.log("Login in Twitter");
  signInWithPopup(auth, TwitterProvider)
    .then((result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      AddUser({
        created_at: new Date(),
        userID: user.uid,
        name: user.displayName,
        email: user.email,
        earnt_coffees: 0,
      });

      console.log("Logged in with:", user.email, user, token);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

function SocialButton({ onPress, SVG, name }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(name)}
      style={{
        borderColor: "#ddd",
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
      }}
    >
      <SVG height={24} width={24} />
    </TouchableOpacity>
  );
}

export function SocialButtons() {
  return (
    <>
      <SocialButton onPress={HandleGmailLogin} SVG={GoogleSVG} name="Google" />
      <SocialButton
        onPress={HandleFacebookLogin}
        SVG={FacebookSVG}
        name="Facebook"
      />
      <SocialButton
        onPress={HandleTwitterLogin}
        SVG={TwitterSVG}
        name="Twitter"
      />
    </>
  );
}
