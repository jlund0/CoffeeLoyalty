import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import React, { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Icon, ListItem } from "@rneui/base";
import { FAB, Dialog, BottomSheet, Divider, SpeedDial } from "@rneui/themed";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
// import WalletManager from 'react-native-wallet-manager';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Pressable,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { UserDetailsPage } from "./userDetails";

export function UserButton({ navigation }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const auth = getAuth(app);
  const handleLogout = () => {
    console.log("clicked");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
        console.log("sign out error" + error);
      });
  };

  //TODO
  const addCardtoWallet = () => {
    console.log("add card");
  };
  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: "settings", color: "black", size: 50 }}
      openIcon={{ name: "close", size: 50 }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      buttonStyle={{
        backgroundColor: "white",
        width: 90,
        height: 90,
        // borderRadius: 50,
        borderWidth: 5,
        borderColor: "black",
        borderRadius: 50,
      }}
      containerStyle={{ padding: 0 }}
      iconContainerStyle={{
        padding: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
      style={{ zIndex: 2, flex: 1 }}
    >
      <SpeedDial.Action
        icon={{ name: "account-circle", type: "material-community", size: 40 }}
        title="User details"
        onPress={() => {
          navigation.navigate("userDetails");
        }}
        color="white"
        iconContainerStyle={{
          padding: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        buttonStyle={{ width: 60, height: 60 }}
        titleStyle={{ fontSize: 35 }}
      />
      <SpeedDial.Action
        icon={{
          name: "wallet-plus-outline",
          type: "material-community",
          size: 40,
        }}
        title="Add to wallet"
        onPress={addCardtoWallet}
        color="white"
        iconContainerStyle={{
          padding: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        buttonStyle={{ width: 60, height: 60 }}
        titleStyle={{ fontSize: 35 }}
      />
      <SpeedDial.Action
        icon={{ name: "logout", size: 40 }}
        title="Log out"
        onPress={handleLogout}
        color="red"
        iconContainerStyle={{
          padding: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        buttonStyle={{ width: 60, height: 60 }}
        titleStyle={{ fontSize: 35 }}
      />
    </SpeedDial>
  );
}

export const RedeemButton = ({ disabled = false, card, uid, fetchCards=()=>null }) => {
  const [isdisabled, setDisabled] = useState(disabled);
  const [animation] = useState(new Animated.Value(0));
  const [redeem, setRedeem] = useState(false);
  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 2,
        duration: 3000,
        // easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const interpolateColor = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["#89cff0ff", "white", "#89cff0ff"], // Change color from red to blue
  });

  const animatedStyle = {
    backgroundColor: interpolateColor,
  };

  return (
    <Pressable
      style={{
        alignSelf: "center",
        backgroundColor: "white",
        borderRadius: 20,
      }}
      disabled={isdisabled}
      onPress={() => {
        setRedeem(true);
      }}
    >
      <Animated.View
        style={
          !isdisabled
            ? [
                {
                  borderWidth: 5,
                  borderRadius: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                },
                animatedStyle,
              ]
            : [
                {
                  borderWidth: 5,
                  borderRadius: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.5,
                },
              ]
        }
      >
        <Text style={{ color: "#000", fontSize: 22, fontWeight: "bold" }}>
          Redeem
        </Text>
      </Animated.View>
      <Dialog
        isVisible={redeem}
        onBackdropPress={() => {
          setRedeem(false);
          fetchCards();
        }}
        style={{
          backgroundColor: "orange",
        }}
        overlayStyle={{ borderRadius: 20 }}
      >
        <Dialog.Title
          title="Free Drink 🎉"
          titleStyle={{ alignSelf: "center", fontSize: 24 }}
        />
        <Text
          style={{ alignSelf: "center", fontSize: 18, textAlign: "center" }}
        >
          You have a free drink from {"\n"}
          {card.name}
        </Text>
        <Text style={{ alignSelf: "center" }}>
          Redeem by getting this QR scanned {"\n"}
        </Text>
        <Divider width={5} />
        <View style={{ alignSelf: "center", padding: 20 }}>
          <QRCode value={`${uid}/${card.cardId}/redeem`} size={150} />
        </View>
      </Dialog>
    </Pressable>
  );
};
