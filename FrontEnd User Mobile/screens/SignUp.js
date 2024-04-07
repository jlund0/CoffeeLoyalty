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
  Pressable,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { AddUser } from "../firebasefunctions";
import { app } from "../firebase";
import { SocialButtons } from "../components/socialSignin";
const auth = getAuth(app);
auth.languageCode = "it";

const handleEmailSignUp = async (email, password) => {
  // const arr = name.split(" ");
  // for (var i = 0; i < arr.length; i++) {
  //   arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
  // }

  // const formattedName = arr.join(" ");
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    // await updateProfile(auth.currentUser, { displayName: formattedName });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
  }
};

export default function SignUpScreen({ navigation }) {
  const [password, setPassword] = React.useState("");
  // const [name, setName] = React.useState("");
  // const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FAF0E6",
        overflow: "hidden",
      }}
    >
      <View style={{ padding: 25 }}>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          {/*Animated card login image*/}
          <Image
            source={require("../assets/coffeelogin.png")}
            style={{ height: 300, width: 300 }}
            resizeMode="contain"
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
        {/* <View
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
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 20 }}
          />
        </View> */}
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
        <Pressable
          style={{
            backgroundColor: "#ADD8E6",
            padding: 10,
            borderRadius: 20,
          }}
          onPress={() => handleEmailSignUp(email, password)}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            Create Account
          </Text>
        </Pressable>

        {/* <Text
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
          <SocialButtons />
        </View> */}

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
