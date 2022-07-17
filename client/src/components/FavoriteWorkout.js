import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const FavoriteWorkout = ({ item, onPress }) => {
  const formatDate = (ms) => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
  };

  const { title, time } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={{ color: "white" }} numberOfLines={3}>
        {formatDate(time)}
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

export default FavoriteWorkout;
