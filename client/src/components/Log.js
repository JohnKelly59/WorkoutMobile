import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const Log = ({ item, onPress }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={{ color: "white" }} numberOfLines={3}>
        {desc}
      </Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#CFB53B",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});

export default Log;
