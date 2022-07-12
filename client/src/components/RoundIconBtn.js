import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {
  return (
    <AntDesign
      color={"white"}
      name={antIconName}
      size={size || 24}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: "#CFB53B",
    elevation: 5,
  },
});

export default RoundIconBtn;
