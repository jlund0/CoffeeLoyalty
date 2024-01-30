import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export function EnterName({ navigation }) {
  console.log("Enter name");
  const [name, setName] = useState("");
  const handleName = (name) => {
    const arr = name.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    const formattedName = arr.join(" ");
    updateProfile(auth.currentUser, {
      displayName: formattedName,
    })
      .then(() => {
        console.log("updated with " + formattedName);
        console.log(auth.currentUser);
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.navigate("Home");
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>How should we greet you?</Text>
      <TextInput
        placeholder={"Name"}
        value={name}
        onChangeText={setName}
        style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 20 }}
      />
      <Pressable onPress={() => handleName(name)}>
        <Text>Confirm</Text>
      </Pressable>
    </View>
  );
}
