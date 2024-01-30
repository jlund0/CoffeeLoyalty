import { View, Text, ActivityIndicator } from "react-native";

export function LoadingScreen(userdetails) {
  console.log("loading");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Roasting Coffee...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
