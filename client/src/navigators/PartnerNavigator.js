import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import PartnersScreen from "../screens/PartnersScreen";
import PartnerRequestScreen from "../screens/PartnerRequestScreen";
import PartnerSearchScreen from "../screens/PartnerSearchScreen";

const Drawer = createDrawerNavigator();

function PartnerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Your Partners" component={PartnersScreen} />
      <Drawer.Screen name="Partner Requests" component={PartnerRequestScreen} />
      <Drawer.Screen name="Search Users" component={PartnerSearchScreen} />
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

export default PartnerNavigator;
