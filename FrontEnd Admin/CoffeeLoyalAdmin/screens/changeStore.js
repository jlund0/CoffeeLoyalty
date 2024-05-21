import { getStoreLogo, getStores } from "../firebaseFunctions";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { flushSync } from "react-dom";

export function HomeScreen({ navigation, route }) {
  const { userToken } = route.params;
  const [loading, setloading] = useState(true);
  const [stores, setStores] = useState([]);

  function navigateToStorePage(store) {
    navigation.push("Main Page", store);
  }

  useEffect(() => {
    const fetchStores = async () => {
      let data = await getStores(userToken);
      setStores(data);
    };
    fetchStores();

    setloading(false);
  }, []);

  if (loading) {
    return <Text>Fetching Stores</Text>;
  }

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 26 }}>Select your store</Text>
      <ScrollView
        style={{
          flex: 1,
          paddingVertical: 20,
          width: "80%",
        }}
      >
        {stores.map((store, index) => (
          <StoreSelectionWidget
            navigation={navigation}
            store={store}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function StoreSelectionWidget({ store, navigation }) {
  console.log(store);
  const { name, logo, location } = store;
  const storeData = async (value) => {
    try {
      console.log("writting to default store");
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("default-store", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const navigateToStorePage = () => {
    // storeData(store);
    navigation.navigate("Main Page", store);
  };
  return (
    <Pressable
      onPress={() => navigateToStorePage()}
      style={{
        flexDirection: "row",
        marginVertical: 10,
        backgroundColor: "grey",
        borderRadius: 3,
      }}
    >
      <Image
        source={{ uri: logo }}
        width={100}
        height={100}
        style={{ borderWidth: 2, width: 75, height: 75 }}
        resizeMode="contain"
      />
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ flex: 1, fontSize: 20, fontWeight: "bold" }}>
          {name}
        </Text>
        <Text numberOfLines={1} style={{ flex: 1 }}>
          {location}
        </Text>
      </View>
    </Pressable>
  );
}
