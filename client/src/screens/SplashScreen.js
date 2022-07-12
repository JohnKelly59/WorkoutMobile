import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

const SplashScreen = () => {
  return <View style={[styles.container, { backgroundColor: "#CFB53B" }]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SplashScreen;
