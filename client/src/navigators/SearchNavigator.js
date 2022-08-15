import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SearchScreen from "../screens/SearchScreen";
import RandomScreen from "../screens/RandomScreen";

const Drawer = createDrawerNavigator();

function SearchNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Look Up" component={SearchScreen} />
      <Drawer.Screen name="Random" component={RandomScreen} />
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

export default SearchNavigator;
