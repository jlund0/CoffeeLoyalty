import { getStoreLogo, getStores } from "../firebaseFunctions";
import { View, Text, Image, Pressable } from "react-native";
import { useEffect, useState } from "react";

export function HomeScreen({ navigation, route }) {
  const { userToken } = route.params;
  const [loading, setloading] = useState(true);
  const [stores, setStores] = useState([]);

  function navigateToStorePage(store) {
    navigation.push("Store Page", store);
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
  const navigateToStorePage = () => {
    navigation.push("Store Page", store);
  };
  return (
    <Pressable onPress={() => navigateToStorePage()}>
      <Image source={{ uri: logo }} width={40} height={40} />
      <Text>{name}</Text>
      <Text>{location}</Text>
    </Pressable>
  );
}
