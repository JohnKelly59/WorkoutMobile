import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";

import UserContext from "../contexts/UserContext";
import { Button, NativeBaseProvider, Stack } from "native-base";
import { useWorkout } from "../contexts/WorkoutContext";

function HomeScreen(props) {
  const { chosenExercises } = useWorkout();
  const user = React.useContext(UserContext);
  const isGuest = () => {
    if (user.firstName !== "Guest") {
      props.navigation.navigate("WorkoutSettingsScreen");
    } else {
      Alert.alert("Wait!", "You must be signed in to use this feature.", [
        {
          text: "OK",
          onPress: () => console.log("ok"),
        },
      ]);
    }
  };

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
          {chosenExercises.length > 0 ? (
            <Button
              size={250}
              style={styles.button}
              onPress={() => props.navigation.navigate("WorkoutScreen")}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 30 }}
              >
                Resume Workout
              </Text>
            </Button>
          ) : (
            <Button size={250} style={styles.button} onPress={() => isGuest()}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 30 }}
              >
                Start Workout
              </Text>
            </Button>
          )}
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
