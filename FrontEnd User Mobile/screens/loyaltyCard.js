import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  Text,
  ImageBackground,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";

function CoffeeTicker({ cardDetails }) {
  console.log(cardDetails.coffees_required, cardDetails.coffees_purchased);
  const list = [...Array(cardDetails.coffees_required).keys()];
  return (
    <View style={styles.CheckBox}>
      {cardDetails.coffees_purcbased === list.length ? (
        <View style={{ width: "100%", height: "100%", backgroundColor: "FFF" }}>
          <Image src={require("../assets/coffeeGuy.png")} />
          <Text>Free Coffee</Text>
          <Pressable
            onPress={() => {
              RedeemCoffee;
            }}
          >
            <Text>Redeem</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {list.map((i) => {
            return (
              <View
                style={{
                  width: "40%",
                  height: "auto",
                  backgroundColor: "#FFFDD0",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 40,
                  borderWidth: 4,
                  borderColor: "#C4A484",
                  aspectRatio: 1,
                }}
              >
                <View>
                  <Image
                    source={{ uri: cardDetails.logo }}
                    style={{
                      width: 50,
                      height: 50,
                      opacity: 0.4,
                    }}
                  />
                  {i < cardDetails.coffees_purchased ? (
                    <Image
                      source={require("../assets/bean_stamp.png")}
                      style={{
                        width: 80,
                        height: 80,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translateY(-50%) translateX(-50%)",
                      }}
                    />
                  ) : null}
                </View>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
}

export default function LoyaltyCard({ navigation, route }) {
  console.log("LoyaltyCard");
  const cardDetails = route.params;
  console.log(cardDetails);
  // const list = [...Array(cardDetails.coffees_required).keys()];
  return (
    <ImageBackground
      source={require("../assets/card_background.png")}
      resizeMode="cover"
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
      <Image
        source={{ uri: cardDetails.logo }}
        style={{
          height: 250,
          width: 250,
          resizeMode: "contain",
          alignSelf: "center",
          flex: 1.5,
          padding: 30,
        }}
      />
      <CoffeeTicker cardDetails={cardDetails} />
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
    </ImageBackground>
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
    backgroundColor: "#cdb891",
    flex: 2,
    marginBottom: 40,
  },
});
