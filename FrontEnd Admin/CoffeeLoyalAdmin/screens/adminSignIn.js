import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Pressable, Button } from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);
auth.languageCode = "it";

export function AdminSignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailandPasswordLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ justifyContent: "center", flex: 1, padding:40 }}>
      <Text style={{fontSize:30, paddingVertical:20}}>Store Login</Text>
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
          style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 10 }}
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
          style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 10 }}
        />
        <TouchableOpacity>
          <Text>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Login"
        onPress={() => handleEmailandPasswordLogin(email, password)}
      />
      {/* <Pressable onPress={() => navigation.navigate("Employee Sign In")}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          Employee Sign In
        </Text>
      </Pressable> */}
    </View>
  );
}
