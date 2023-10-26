import * as React from "react";
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
import { FacebookSVG, TwitterSVG, GoogleSVG } from "../assets/socialSVG.js";

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

function SocialButton({ name, onPress, colors, SVG }) {
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
      <SVG height={24} width={24} />
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
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#FAF0E6" }}
    >
      <View style={{ padding: 25 }}>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          {/*Animated card login image*/}
          <Image
            source={require("../assets/Loyalty-Cards19.png")}
            style={{ height: 300, width: 300 }}
          ></Image>
        </View>
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Login
        </Text>

        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <FontAwesome name="at" size={20} />
          <TextInput
            placeholder={" Email"}
            value={email}
            onChangeText={setEmail}
            inputMode="email"
            style={{ flex: 1, paddingVertical: 0 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <FontAwesome name="lock" size={20} />
          <TextInput
            placeholder={" Password"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ flex: 1, paddingVertical: 0 }}
          />
          <TouchableOpacity>Forgot your password?</TouchableOpacity>
        </View>
        <Button
          title="Login"
          onPress={() => handleEmailandPasswordLogin(email, password)}
        />

        <Text
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: 30,
            marginTop: 30,
          }}
        >
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 30,
          }}
        >
          <SocialButton
            name="facebook"
            onPress={() => HandleFacebookLogin()}
            colors="#1877F2"
            SVG={FacebookSVG}
          />
          <SocialButton
            name="google"
            onPress={HandleGmailLogin}
            colors="#4285F4,#DB4437,#F4B400,#0F9D58"
            SVG={GoogleSVG}
          />
          <SocialButton
            name="twitter"
            onPress={() => HandleTwitterLogin()}
            colors="#1DA1F2"
            SVG={TwitterSVG}
          />
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
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
});
