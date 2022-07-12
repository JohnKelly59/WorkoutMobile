import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        placeholderTextColor="white"
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder="Search here.."
      />
      {value ? (
        <AntDesign
          name="close"
          size={20}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
    backgroundColor: "#CFB53B",
    color: "white",
  },
  container: {
    justifyContent: "center",
  },
  clearIcon: {
    position: "absolute",
    right: 10,
    color: "white",
  },
});

export default SearchBar;
