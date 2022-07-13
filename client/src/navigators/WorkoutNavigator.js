import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WorkoutScreen from "../screens/WorkoutScreen";
import WorkoutSettingsScreen from "../screens/WorkoutSettingsScreen";
import WorkoutSettingsTimeScreen from "../screens/WorkoutSettingsTimeScreen";
import WorkoutProvider from "../contexts/WorkoutContext";
import HomeScreen from "../screens/HomeScreen";

const WorkoutStack = createStackNavigator();

const WorkoutNavigator = (navigation) => {
  const RenderWorkoutSettingsScreen = (props) => (
    <WorkoutSettingsScreen {...props} />
  );

  return (
    <WorkoutProvider>
      <WorkoutStack.Navigator
        screenOptions={{ headerTitle: "", headerTransparent: true }}
      >
        <WorkoutStack.Screen component={HomeScreen} name="HomeScreen" />
        <WorkoutStack.Screen
          component={RenderWorkoutSettingsScreen}
          name="WorkoutSettingsScreen"
          options={{ headerLeft: () => null }}
        />
        <WorkoutStack.Screen
          component={WorkoutSettingsTimeScreen}
          name="WorkoutSettingsTimeScreen"
          options={{ headerLeft: () => null }}
        />
        <WorkoutStack.Screen
          component={WorkoutScreen}
          name="WorkoutScreen"
          options={{ headerLeft: () => null }}
        />
      </WorkoutStack.Navigator>
    </WorkoutProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WorkoutNavigator;
