import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { UserButton } from "../components/buttons.js";
import { useState } from "react";
import { Divider, Icon } from "@rneui/base";
import { Tooltip, Dialog, Image } from "@rneui/themed";
import { useFonts, RockSalt_400Regular } from "@expo-google-fonts/rock-salt";

export default function HomeScreen({ userDetails, navigation }) {
  let greetingslist = ["Hello", "Welcome back", "Hey", "Good Morning"];
  const [greetings, setGreetings] = useState(
    greetingslist[Math.floor(Math.random() * greetingslist.length)]
  );
  const [open, setOpen] = useState(false);
  let [fontsLoaded] = useFonts({
    RockSalt_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ImageBackground
      source={require("../assets/background-blob.png")}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          marginHorizontal: 25,
          paddingTop: 100,
          paddingBottom: 40,
        }}
      >
        {/* <View
        style={{
          position: "absolute",
          top: 0,
          width: "120%",
          height: "20%",
          backgroundColor: "#704523",
          zIndex: -1,
        }}
      ></View> */}
        <View
          style={{
            backgroundColor: "#C4A484",
            width: "100%",
            borderRadius: 10,
            padding: 20,
            height: 150,
            flexDirection: "row",
            alignItems: "center",
            elevation: 1,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 8,
            borderRightWidth: 8,
          }}
        >
          <View
            style={{
              flex: 3,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              {greetings},
            </Text>

            <Text
              style={[
                {
                  fontWeight: "800",
                  fontSize: 40,
                  backgroundColor: "white",
                  borderBottomWidth: 3,
                  borderStyle: "dashed",
                  paddingLeft: 20,
                },
                styles.font,
              ]}
            >
              {userDetails.name.split(" ")[0]}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              setOpen(true);
            }}
            style={{
              alignSelf: "flex-end",
              backgroundColor: "#604a33",
              borderRadius: 10,
              padding: 15,
              position: "absolute",
              bottom: -35,
              right: -15,
              elevation: 1,
              borderTopWidth: 2,
              borderLeftWidth: 2,
              borderBottomWidth: 8,
              borderRightWidth: 8,
            }}
          >
            <Text
              style={{
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              ☕👋
            </Text>
          </Pressable>

          <Dialog
            isVisible={open}
            onBackdropPress={() => {
              setOpen(false);
            }}
          >
            <Dialog.Title title="🥤 Drink Tally ☕" />
            <Text>
              Loyal Bean has earnt you {userDetails.coffee_earnt} free drinks 🥳
            </Text>
          </Dialog>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 8,
            borderRightWidth: 8,
            transform: "skewY(2deg)",
            padding: 20,
            paddingHorizontal: 20,
            bottom: -35,
            zIndex: 2,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: "bold",
              zIndex: 2,
            }}
          >
            Scan to Earn
          </Text>
        </View>
        <View
          style={{
            width: "fit-content",
            backgroundColor: "#C4A484",
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            borderRadius: 10,
            aspectRatio: 1,
            width: "100%",
            elevation: 1,
            // height: 425,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderBottomWidth: 8,
            borderRightWidth: 8,
            gap: 30,
          }}
        >
          {/* <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flex: 3,
          }}
        > */}
          {/* <Image
          source={require("../assets/logo.png")}
          style={{
            width: "100%",
            height: undefined,
            aspectRatio: 1,
            opacity: 0.8,
          }}
        /> */}

          <QRCode
            value={`${userDetails.userId}/scan`}
            size={280}
            backgroundColor={"transparent"}
            logo={require("../assets/logo.png")}
            logoSize={100}
            logoBackgroundColor="transparent"
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",

          paddingRight: 25,

          height: "100%",
          position: "absolute",
        }}
      >
        <UserButton navigation={navigation}></UserButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: "RockSalt_400Regular",
  },
});
