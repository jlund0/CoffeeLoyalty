import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, Button } from "react-native";
// import WalletManager from 'react-native-wallet-manager';

export function UserButton() {
  const [showMenu, setShowMenu] = useState(false);
  const auth = getAuth(app);
  const handleClick = () => {
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
      <FontAwesome.Button
        name="user-circle"
        backgroundColor="0"
        size={50}
        onPress={() => setShowMenu(!showMenu)}
      ></FontAwesome.Button>
      {showMenu ? (
        <View>
          <Button title="Edit Profile" />
          <Button title="Add the Wallet" onPress={addCardtoWallet} />
          <Button title="Log Out" onPress={handleClick} />
        </View>
      ) : null}
    </>
  );
}
