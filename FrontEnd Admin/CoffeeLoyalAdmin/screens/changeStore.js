import { getStoreLogo, getStores } from "../firebaseFunctions";
import { View, Text, Image, Pressable } from "react-native";
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
    <View>
      <Text>Change Store</Text>
      {stores.map((store, index) => (
        <StoreSelectionWidget
          navigation={navigation}
          store={store}
          key={index}
        />
      ))}
    </View>
  );
}

function StoreSelectionWidget({ store, navigation }) {
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
    storeData(store);
    navigation.push("Main Page", store);
  };
  return (
    <Pressable
      onPress={() => navigateToStorePage()}
      style={{ width: "80%", flexDirection: "row" }}
    >
      <Image
        source={{ uri: logo }}
        width={40}
        height={40}
        style={{ flex: 1 }}
      />
      <View style={{ flex: 5 }}>
        <Text style={{ flex: 1 }}>{name}</Text>
        <Text style={{ flex: 1 }}>{location}</Text>
      </View>
    </Pressable>
  );
}
