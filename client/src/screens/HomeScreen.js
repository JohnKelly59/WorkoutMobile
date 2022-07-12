import React, { useState, useEffect } from "react";
import { Text, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { Button, NativeBaseProvider, Stack } from "native-base";

function HomeScreen(props) {
  return (
    <ImageBackground
      source={require("../../public/images/ape.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <NativeBaseProvider
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Stack
          space={5}
          w="100%"
          alignItems="center"
          style={{ paddingTop: 190 }}
        >
          <Button
            size={250}
            style={styles.button}
            onPress={() => props.navigation.navigate("WorkoutSettingsScreen")}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
              Start Workout
            </Text>
          </Button>
        </Stack>
      </NativeBaseProvider>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#CFB53B",
    borderRadius: 50,
  },
});

export default HomeScreen;
