import { useEffect, useState } from "react";
import LoyaltyCard from "./screens/loyaltyCard";
import { MapScreen } from "./screens/maps.js";
import { EnterName } from "./screens/name.js";

function Auth(Stack, { hasDisplayName }) {
  const [userId, setUserId] = useState("");
  useEffect(() => {}, []);
  return (
    <>
      {!hasDisplayName && (
        <Stack.Screen
          name="EnterName"
          component={EnterName}
          options={TopBanner}
        />
      )}
      <Stack.Screen
        name="Home"
        component={Home}
        options={TopBanner}
        initialParams={{ userid: userToken }}
      />
      <Stack.Screen
        name="card"
        component={CardScreen}
        options={TopBanner}
        // initialParams={userCards}
      />
      <Stack.Screen
        name="settings"
        component={SettingsScreen}
        options={TopBanner}
      />
      <Stack.Screen
        name="loyaltyCard"
        component={LoyaltyCard}
        options={TopBannerLoyaltyCard}
      />
      <Stack.Screen
        name="map"
        component={MapScreen}
        options={TopBannerLoyaltyCard}
      />
    </>
  );
}

export default Auth;
