import React from "react";
import { View, StyleSheet } from "react-native";
import { Image, NativeBaseProvider } from "native-base";

const SplashScreen = () => {
  return (
    <NativeBaseProvider>
      <View style={[styles.container, { backgroundColor: "#000000" }]}>
        <Image
          size={400}
          resizeMode={"contain"}
          source={require("../../assets/homeScreenIcon.jpg")}
        />
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { resizeMode: "contain", flex: 1 },
});

export default SplashScreen;
