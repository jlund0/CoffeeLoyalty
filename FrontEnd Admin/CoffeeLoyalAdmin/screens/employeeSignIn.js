import { View, Text, Pressable, TextInput } from "react-native";
export function EmployeeSignInScreen({ navigation }) {
  return (
    <View>
      {/*set store 
                get login code
                */}
      <Pressable>
        <Text>Scan Login QR</Text>
      </Pressable>
      <Text>or</Text>
      <Text>Enter your login code</Text>
      <TextInput placeholder="Store code"></TextInput>
      <TextInput placeholder="Employee code"></TextInput>
      <Pressable onPress={() => navigation.navigate("Store Sign In")}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          Store Sign In
        </Text>
      </Pressable>
    </View>
  );
}
