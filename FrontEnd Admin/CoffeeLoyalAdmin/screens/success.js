import { View, Text, Image, Pressable } from "react-native";

export function SuccessScreen({ navigation }) {
  setTimeout(function () {
    navigation.navigate("Main Page");
  }, 3000);
  return (
    <View
      style={{
        backgroundColor: "green",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Sucessfully Added Coffees</Text>
      <Image></Image>
      <Pressable onPress={() => navigation.navigate("Main Page")}>
        <Text>OK</Text>
      </Pressable>
    </View>
  );
}
