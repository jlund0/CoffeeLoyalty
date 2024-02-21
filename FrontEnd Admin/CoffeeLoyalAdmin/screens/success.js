import { View, Text, Image, Pressable } from "react-native";

export function SuccessScreen({ navigation, route }) {
  let { name, addCoffees } = route.params;
  setTimeout(function () {
    navigation.navigate("Main Page");
  }, 2000);
  return (
    <View
      style={{
        backgroundColor: "#98FB98",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
      }}
    >
      <Text style={{ fontSize: 40, color: "white", textAlign: "center" }}>
        {`Sucessfully Added ${addCoffees} Coffees to ${name}`}
      </Text>
    </View>
  );
}
