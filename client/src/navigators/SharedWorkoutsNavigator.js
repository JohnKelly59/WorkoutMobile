import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SharedWorkoutsScreen from "../screens/SharedWorkoutsScreen";
import SharedWorkoutsDetail from "../components/SharedWorkoutsDetail";
import SharedWorkoutsProvider from "../contexts/SharedWorkoutsContext";

const SharedWorkoutsStack = createStackNavigator();

const SharedWorkoutsNavigator = (navigation) => {
  const RenderSharedWorkoutsScreen = (props) => (
    <SharedWorkoutsScreen {...props} />
  );

  return (
    <SharedWorkoutsProvider>
      <SharedWorkoutsStack.Navigator
        screenOptions={{
          headerTitle: "",
          headerTintColor: "#CFB53B",
          headerTransparent: true,
        }}
      >
        <SharedWorkoutsStack.Screen
          component={RenderSharedWorkoutsScreen}
          name="SharedWorkoutsScreen"
          options={{ headerLeft: () => null }}
        />
        <SharedWorkoutsStack.Screen
          component={SharedWorkoutsDetail}
          name="SharedWorkoutsDetail"
        />
      </SharedWorkoutsStack.Navigator>
    </SharedWorkoutsProvider>
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

export default SharedWorkoutsNavigator;
