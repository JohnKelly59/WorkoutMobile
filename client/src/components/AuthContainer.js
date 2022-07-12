import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const AuthContainer = ({ children }) => {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});

export default AuthContainer;
