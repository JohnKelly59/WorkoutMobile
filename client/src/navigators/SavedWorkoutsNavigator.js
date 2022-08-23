import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import FavoriteWorkoutsScreen from "../screens/FavoriteWorkoutsScreen";
import FavoriteWorkoutsDetail from "../components/FavoriteWorkoutsDetail";
import { Ionicons } from "@expo/vector-icons";
import FavoriteWorkoutsProvider from "../contexts/FavoriteWorkoutsContext";
import FavoriteWorkoutsNavigator from "./FavoriteWorkoutsNavigator";
import SharedWorkoutsNavigator from "./SharedWorkoutsNavigator";
// import SharedWorkoutsProvider from "../contexts/SharedWorkoutsContext";
// import SharedWorkoutsScreen from "../screens/SharedWorkoutsScreen";
// import SharedWorkoutsDetail from "../components/SharedWorkoutsDetail";

const SavedWorkoutsStack = createDrawerNavigator();

const SavedWorkoutsNavigator = ({ navigation }) => {
  return (
    <SavedWorkoutsStack.Navigator
      screenOptions={{
        drawerActiveTintColor: "#CFB53B",
        headerTintColor: "#CFB53B",
      }}
    >
      <SavedWorkoutsStack.Screen
        component={FavoriteWorkoutsNavigator}
        name="Saved Workouts"
      />
      <SavedWorkoutsStack.Screen
        component={SharedWorkoutsNavigator}
        name="Shared Workouts"
      />
    </SavedWorkoutsStack.Navigator>
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

export default SavedWorkoutsNavigator;
