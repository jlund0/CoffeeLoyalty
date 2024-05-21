import { Divider } from "@rneui/base";
import { Input, Button, Overlay, Card, Icon, Dialog } from "@rneui/themed";
import { Pressable, Text, View } from "react-native";
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { updateUserinfo } from "../Old/firebasefunctions";

export function UserDetailsPage({}) {
  const auth = getAuth();
  const user = auth.currentUser;
  const [edit, setEdit] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [DisplayName, setDisplayName] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const handleSave = () => {
    setEdit(!edit);
    if (email != "") {
      updateEmail(user, email);
      updateUserinfo(user.uid, { email: email });
    }
    if (password != "" && password.length > 10) {
      updatePassword(user, password);
    } else {
      console.log("password not changed");
      setShowError(true);
    }
    if (DisplayName != "") {
      updateProfile(user, { displayName: DisplayName });
      updateUserinfo(user.uid, { name: DisplayName });
    }
  };

  useEffect(() => {
    if (password.length > 10) setPasswordMessage("Valid");
    else {
      setPasswordMessage("Password must be 10 characters");
    }
  }, [password]);

  const handleDelete = () => {
    deleteUser(user);
  };
  return (
    <>
      <Card containerStyle={{ padding: 20 }}>
        <View style={{ position: "absolute", zIndex: 1, top: 20, right: 20 }}>
          <Icon name="edit" onPress={() => setEdit(!edit)} size={25} />
        </View>
        <Card.Title style={{ fontSize: 24, padding: 20 }}>
          User Details{" "}
        </Card.Title>
        <Text style={{ fontSize: 22, marginHorizontal: 10 }}>Name</Text>
        <Divider
          style={{ width: "100%", alignSelf: "center", marginHorizontal: 10 }}
        />

        <Input
          placeholder={user.displayName}
          disabled={edit}
          onChangeText={setDisplayName}
        />

        <Text style={{ fontSize: 22, marginHorizontal: 10 }}>Email</Text>
        <Divider
          style={{ width: "100%", alignSelf: "center", marginHorizontal: 10 }}
        />
        <Input
          placeholder={user.email}
          disabled={edit}
          onChangeText={setEmail}
        />
        <Text style={{ fontSize: 22, marginHorizontal: 10 }}>Password</Text>
        <Divider
          style={{ width: "100%", alignSelf: "center", marginHorizontal: 10 }}
        />
        <Input
          placeholder="*********"
          disabled={edit}
          onChangeText={setPassword}
          secureTextEntry={true}
          errorStyle={{ color: passwordMessage == "Valid" ? "green" : "red" }}
          errorMessage={!edit && passwordMessage}
        />
        {!edit ? (
          <Button
            title="Save"
            onPress={() => {
              setEdit(!edit);
              handleSave;
            }}
          >
            <Text>Save</Text>
          </Button>
        ) : null}
        {/* <Text>Member since: {user.createdAt}</Text> */}
        {showError && (
          <Text style={{ color: "red" }}>Cannot save password too short</Text>
        )}
      </Card>
      <Card
        containerStyle={{ backgroundColor: "#FF7F7F", alignItems: "center" }}
      >
        <Card.Title style={{ fontSize: 24, padding: 20 }}>
          Danger Zone
        </Card.Title>
        <Button
          onPress={() => setShowDelete(!showDelete)}
          buttonStyle={{ backgroundColor: "white" }}
          type="outline"
          containerStyle={{
            height: 40,
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ color: "white", marginHorizontal: 20 }}
        >
          <Text>Delete account</Text>
        </Button>
      </Card>
      <Dialog
        isVisible={showDelete}
        onBackdropPress={() => setShowDelete(!showDelete)}
      >
        <Dialog.Title title="Delete Account" />

        <Text>Are you sure you want to delete your account? </Text>

        <Dialog.Actions>
          <Button onPress={() => handleDelete} title={"Delete"} />
          <Button onPress={() => setShowDelete(!showDelete)} title={"Cancel"} />
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
