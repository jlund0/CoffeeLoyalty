import { Image } from "@rneui/themed";
import { Text, View, Animated, Easing } from "react-native";
import { LinearProgress } from "@rneui/themed";
import { useRef, useState, useEffect } from "react";

export function SplashPage() {
  const [spinAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(spinAnimation, {
        toValue: 2,
        duration: 54000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  };

  const rotate = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: rotate }],
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ position: "absolute", zIndex: 2, width: "70%" }}>
          <Image
            source={require("../assets/frontlogo.png")}
            style={{ width: "100%", height: undefined, aspectRatio: 1 }}
          />
        </View>
        <View style={{ position: "absolute", zIndex: -2, width: "70%" }}>
          <Animated.Image
            source={require("../assets/backlogo.png")}
            style={[
              {
                width: "100%",
                height: undefined,
                aspectRatio: 1,
              },
              animatedStyle,
            ]}
          />
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* <Text style={{ fontSize: 26 }}>Roasting Loyal Bean</Text> */}
        <LinearProgress
          style={{ width: "60%", marginTop: 10 }}
          color="brown"
          trackColor="lightblue"
        />
      </View>
    </View>
  );
}
