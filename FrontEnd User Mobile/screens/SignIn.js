import * as React from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  getAuth,
  signInWithEmailAndPassword,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);
auth.languageCode = "it";
const GoogleProvider = new GoogleAuthProvider();
const TwitterProvider = new TwitterAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

//Sign Ins
const handleEmailandPasswordLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Logged in with:", user.email);
    })
    .catch((error) => alert(error.message));
};

//Social Sign Ins
const HandleGmailLogin = () => {
  console.log("Login in Gmail");
  signInWithPopup(auth, GoogleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
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
  console.log("Loggin in Facebook");
  auth
    .signInWithPopup(FacebookProvider)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Logged in with:", user.email);
    })
    .catch((error) => alert(error.message));
};
const HandleTwitterLogin = () => {
  console.log("Login in Twitter");
  auth
    .signInWithPopup(TwitterProvider)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Logged in with:", user.email);
    })
    .catch((error) => alert(error.message));
};

function SocialButton({ name, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress;
      }}
      style={{
        borderColor: "#ddd",
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
      }}
    >
      <FontAwesome name={name} height={24} width={24} />
    </TouchableOpacity>
  );
}

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     console.log("user " + uid + " signed in");

  //     return true;
  //   } else {
  //     navigation.navigate("Login");
  //     console.log("no user signed in");
  //     return false;
  //   }
  // });

  return (
    <View>
      <FontAwesome name="at" size={20} />
      <TextInput
        placeholder={"Email ID"}
        value={email}
        onChangeText={setEmail}
        inputMode="email"
      />
      <FontAwesome name="lock" size={20} />
      <TextInput
        placeholder={"Password"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={() => handleEmailandPasswordLogin(email, password)}
      />
      <Text>Forgot your password?</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, login with ...
        </Text>
        <SocialButton
          name="facebook-square"
          onPress={() => HandleFacebookLogin()}
        />
        <SocialButton name="google" onPress={HandleGmailLogin} />
        <SocialButton name="twitter" onPress={() => HandleTwitterLogin()} />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Text>New to the app?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
