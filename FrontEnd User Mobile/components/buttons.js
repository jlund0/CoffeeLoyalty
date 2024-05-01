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

export function UserButton() {
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
    <>
      <Icon
        name="settings"
        type="feather"
        size={30}
        raised
        onPress={() => setIsVisible(true)}
      />
      {/* <View style={{ position: "absolute", zIndex: 3 }}>
        <FAB icon={{ name: "add", color: "white" }} />
        <ListItem>
          <FAB icon={{ name: "user" }} />
        </ListItem>
        <ListItem>
          <FAB icon={{ name: "wallet" }} />
        </ListItem>
        <ListItem>
          <FAB icon={{ name: "logout" }} />
        </ListItem>
      </View> */}
      {/* <SpeedDial
        isOpen={showMenu}
        icon={{ name: "settings", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setShowMenu(!showMenu)}
        onClose={() => setShowMenu(!showMenu)}
        placement="right"
        style={{}}
      >
        <SpeedDial.Action placement="bottom" />
      </SpeedDial> */}
      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        backdropStyle={{
          opacity: 0,
        }}
      >
        <ListItem
          containerStyle={{
            margin: 10,
            borderRadius: 10,
          }}
        >
          <ListItem.Content>
            <ListItem.Title style={{ alignSelf: "center" }}>
              <Icon type="font-awesome" name="user" />
              User details
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          containerStyle={{
            margin: 10,
            borderRadius: 10,
          }}
        >
          <ListItem.Content>
            <ListItem.Title style={{ alignSelf: "center" }}>
              <Icon type="material-community" name="wallet-plus-outline" />
              Add to wallet
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          onPress={() => handleLogout}
          containerStyle={{
            backgroundColor: "red",
            margin: 10,
            borderRadius: 10,
          }}
        >
          <ListItem.Content>
            <ListItem.Title style={{ color: "white", alignSelf: "center" }}>
              <Icon type="material-community" name="logout" />
              Log out
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </>
  );
}

export const RedeemButton = ({ disabled = false, card }) => {
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
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  };

  const interpolateColor = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      "rgba(255, 0, 0, 0.5)",
      "rgba(0, 0, 255, 0.5)",
      "rgba(255, 0, 0, 0.5)",
    ], // Change color from red to blue
  });

  const animatedStyle = {
    borderColor: interpolateColor,
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
          <QRCode value={`${card.cardId}/redeem`} size={150} />
        </View>
      </Dialog>
    </Pressable>
  );
};
