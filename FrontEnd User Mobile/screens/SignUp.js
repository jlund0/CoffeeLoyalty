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
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  TwitterAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { app } from "../firebase";
import { FacebookSVG, TwitterSVG, GoogleSVG } from "../assets/socialSVG";

const auth = getAuth(app);
auth.languageCode = "it";
const GoogleProvider = new GoogleAuthProvider();
const TwitterProvider = new TwitterAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

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

export default function SignUpScreen({ navigation }) {
  console.log("sign up screen")
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  async function addUser() {
    console.log("adding user to Database");
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.uid,
        name: user.displayName,
        email: user.email,
        points: 0,
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  const handleEmailSignUp = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, { displayName: name });
        // addUser(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  };

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
          Sign Up
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
          <TextInput
            placeholder={" Name"}
            value={name}
            onChangeText={setName}
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
          {/* <TextInput
          id="passwordCheck"
            placeholder={" Confirm Password"}
            value={password}
            onChangeText={setPasswordCheck}
            secureTextEntry
            style={{ flex: 1, paddingVertical: 0 }}
          /> */}
        </View>
        <Button
          title="Create Account"
          onPress={() => handleEmailSignUp(email, password, name)}
        />

        <Text
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: 30,
            marginTop: 30,
          }}
        >
          Or, Create an account with ...
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
          <Text>already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              {" "}
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {},
});
