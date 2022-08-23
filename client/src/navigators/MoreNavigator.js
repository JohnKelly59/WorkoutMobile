import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import FavoritesScreen from "../screens/FavoritesScreen";
import LogsNavigator from "../navigators/LogsNavigator";

const Drawer = createDrawerNavigator();

function MoreNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#CFB53B",
        headerTintColor: "#CFB53B",
      }}
    >
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="Logs" component={LogsNavigator} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MoreNavigator;
