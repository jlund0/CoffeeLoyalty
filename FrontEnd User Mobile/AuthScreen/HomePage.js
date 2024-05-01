import { View, Text, Pressable } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { UserButton } from "../components/buttons.js";
import { useState } from "react";
import { Divider, Icon } from "@rneui/base";
import { Tooltip, Dialog } from "@rneui/themed";

export default function HomeScreen({ userDetails }) {
  let greetingslist = ["Hello ", "Welcome back ", "Hey ", "Good Morning "];
  const [greetings, setGreetings] = useState(
    greetingslist[Math.floor(Math.random() * greetingslist.length)]
  );
  const [open, setOpen] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        marginHorizontal: 25,
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
          height: 125,
          flexDirection: "row",
          alignItems: "center",
          elevation: 1,
        }}
      >
        <View
          style={{
            flex: 3,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            {greetings},
          </Text>

          <Text style={{ fontWeight: "800", fontSize: 40 }}>
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
          width: "fit-content",
          backgroundColor: "#eaded6",
          // padding: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          aspectRatio: 1,
          width: "100%",
          elevation: 1,
        }}
      >
        <QRCode
          value={`${userDetails.userId}/scan`}
          size={275}
          backgroundColor={"transparent"}
          logo={require("../assets/logo.png")}
          logoSize={100}
          logoBackgroundColor="transparent"
        />
      </View>
    </View>
  );
}
