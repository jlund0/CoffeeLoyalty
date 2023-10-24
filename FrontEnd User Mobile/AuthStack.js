import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";

const AuthStack = (Stack) => {
  return (
    <>
      <Stack.Screen name="Login" component={SignInScreen} />
      <Stack.Screen name="Register" component={SignUpScreen} />
    </>
  );
};

export default AuthStack;
