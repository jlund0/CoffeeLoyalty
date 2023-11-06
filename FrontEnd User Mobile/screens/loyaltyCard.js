import { View, Image, Dimensions, StyleSheet, Pressable } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";

const getCoffeesEarnt = () => {
  return 1;
};

function CoffeeTicker({ i, n }) {
  return (
    <View
      style={{
        width: "auto",
        height: "auto",
        backgroundColor: "#FFFDD0",
        alignItems: "center",
        padding: 20,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: "#C4A484",
      }}
    >
      {i < n ? (
        <Image
          source={require("../assets/bean_stamp.png")}
          style={{ width: 50, height: 50 }}
        />
      ) : (
        <View style={{ width: 50, height: 50 }}></View>
      )}
    </View>
  );
}

export default function LoyaltyCard({ navigation, route }) {
  console.log("LoyaltyCard");
  //   const cardDetails = route.params;
  const cardDetails = {
    name: "Starbucks",
    pointsTotal: 6,
    logo: "starbuck_test/logo.png",
    stamp: "bean_stamp.png",
    address: "10 test street perth",
  };
  const coffeesEarnt = getCoffeesEarnt();
  console.log(cardDetails);
  console.log(cardDetails.pointsTotal + " " + coffeesEarnt);
  const list = [...Array(cardDetails.pointsTotal).keys()];
  console.log(list);
  return (
    <View
      style={{
        minHeight: Dimensions.get("window").height,
        maxHeight: Dimensions.get("window").height,
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-evenly",
        overflow: "hidden",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => navigation.navigate("card")}
        style={{ position: "absolute", left: 0, top: 0, margin: 25 }}
      >
        <AntIcon
          name="back"
          size={30}
          style={{
            borderWidth: 2,
            padding: 10,
            borderRadius: 40,
          }}
        />
      </Pressable>
      <Image
        source={require("../assets/" + cardDetails.logo)}
        style={{
          height: 300,
          width: 300,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
      <View style={styles.CheckBox}>
        {list.map((i) => {
          return <CoffeeTicker i={i} n={coffeesEarnt} />;
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  CheckBox: {
    alignContent: "space-around",
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    flexWrap: "wrap",
    borderWidth: 4,
    gap: 40,
    padding: 20,
    paddingVertical: 40,
    alignItems: "center",
    borderRadius: 25,
    borderColor: "#4B2D0B",
  },
});
