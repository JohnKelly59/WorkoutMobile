import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FavoriteWorkoutsScreen from "../screens/FavoriteWorkoutsScreen";
import FavoriteWorkoutsDetail from "../components/FavoriteWorkoutsDetail";
import FavoriteWorkoutsProvider from "../contexts/FavoriteWorkoutsContext";
import FavoritesScreen from "../screens/FavoritesScreen";

const FavoriteWorkoutsStack = createStackNavigator();

const FavoriteWorkoutsNavigator = (navigation) => {
  const RenderFavoriteWorkoutsScreen = (props) => (
    <FavoriteWorkoutsScreen {...props} />
  );

  return (
    <FavoriteWorkoutsProvider>
      <FavoriteWorkoutsStack.Navigator
        screenOptions={{ headerTitle: "", headerTransparent: true }}
      >
        <FavoriteWorkoutsStack.Screen
          component={FavoritesScreen}
          name="FavoritesScreen"
        />
        <FavoriteWorkoutsStack.Screen
          component={RenderFavoriteWorkoutsScreen}
          name="FavoriteWorkoutsScreen"
          options={{ headerLeft: () => null }}
        />
        <FavoriteWorkoutsStack.Screen
          component={FavoriteWorkoutsDetail}
          name="FavoriteWorkoutsDetail"
        />
      </FavoriteWorkoutsStack.Navigator>
    </FavoriteWorkoutsProvider>
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

export default FavoriteWorkoutsNavigator;
