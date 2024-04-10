import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { resetPassword } from "../firebasefunctions";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
// import { SocialButtons } from "../components/socialSignin";

const auth = getAuth(app);
auth.languageCode = "it";

//Sign Ins
const handleEmailandPasswordLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Logged in with:", user.email);
    })
    .catch((error) => alert(error.message));
};

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#FAF0E6",
        }}
      >
        <View style={{ padding: 25 }}>
          <View style={{ alignItems: "center" }}>
            {/*Animated card login image*/}
            <Image
              source={require("../assets/coffeelogin.png")}
              style={[{ height: 300, width: 300, marginBottom: 30 }]}
              resizeMode="contain"
            ></Image>
          </View>
          {resetPassword ? (
            <ResetPassword onClick={() => setResetPassword(false)} />
          ) : (
            <>
              <Text
                style={{
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
                  style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 10 }}
                  // onFocus={()=>setIsFocused(true)}
                  // onBlur={()=>setIsFocused(false)}
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
                  // onFocus={() => setIsFocused(true)}
                  // onBlur={() => setIsFocused(false)}
                />
                <TouchableOpacity onPress={() => setResetPassword(true)}>
                  <Text>Forgot your password?</Text>
                </TouchableOpacity>
              </View>

              <Pressable
                title="Login"
                onPress={() => handleEmailandPasswordLogin(email, password)}
                style={styles.button}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 28,
                    fontWeight: "bold",
                  }}
                >
                  LOGIN
                </Text>
              </Pressable>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 30,
                  padding: 20,
                }}
              >
                <Text>New to the app?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                    {" "}
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

function ResetPassword({ onClick }) {
  const [email, setEmail] = useState("");
  const [emailsent, setemailsent] = useState(false);
  const sendReset = () => {
    resetPassword(email);
    setemailsent(true);
    // setTimeout(() => {
    //   onClick();
    // }, 2000);
  };
  return (
    <>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "500",
          color: "#333",
          marginBottom: 30,
        }}
      >
        Forgot Password?
      </Text>
      {emailsent ? (
        <View style={{ paddingBottom: 30 }}>
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            An email has been sent to
          </Text>
          <Text style={{ textAlign: "center", fontSize: 26 }}>{email}</Text>
          <Text style={{ textAlign: "center", fontSize: 18 }}>
            check your junk folder
          </Text>
        </View>
      ) : (
        <>
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
              placeholder={"Email"}
              value={email}
              onChangeText={setEmail}
              inputMode="email"
              style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 10 }}
              // onFocus={()=>setIsFocused(true)}
              // onBlur={()=>setIsFocused(false)}
            />
          </View>
        </>
      )}
      <Pressable onPress={!emailsent ? sendReset : null} style={styles.button}>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          {emailsent ? `Email sent` : `Reset`}
        </Text>
      </Pressable>

      <TouchableOpacity onPress={onClick}>
        <Text
          style={{ color: "#AD40AF", fontWeight: "700", textAlign: "center" }}
        >
          back
        </Text>
      </TouchableOpacity>
    </>
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
  button: {
    backgroundColor: "#ADD8E6",
    padding: 10,
    borderRadius: 20,
  },
});
