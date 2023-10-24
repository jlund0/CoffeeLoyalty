import * as React from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";
import { NewUser } from "../components/database";

const auth = getAuth(app);

export default function SignUpScreen() {
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  async function addUser() {
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
        addUser(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  };

  return (
    <View>
      <Text>Sign Up with</Text>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          borderColor: "#ddd",
          borderWidth: 2,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 10,
        }}
      >
        <FontAwesome name="google" height={24} width={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          borderColor: "#ddd",
          borderWidth: 2,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 10,
        }}
      >
        <FontAwesome name="facebook-square" height={24} width={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          borderColor: "#ddd",
          borderWidth: 2,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 10,
        }}
      >
        <FontAwesome name="twitter" height={24} width={24} />
      </TouchableOpacity>
      <Text>Or Create account with Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
      ></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Email"
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setPasswordCheck}
      ></TextInput>
      <Button
        title="Create Account"
        onPress={() => handleEmailSignUp(email, password, name)}
      />
      {/*Confirmation Pop-Up
        <View>
          <Text>Confirm Details</Text>
          <Text>Name: {name}</Text>
          <Text>Email: {email}</Text>
          <Button>Create Account</Button>
        </View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {},
});
