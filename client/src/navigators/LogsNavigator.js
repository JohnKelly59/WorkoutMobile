import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LogsScreen from "../screens/LogsScreen";
import LogsDetail from "../components/LogsDetail";
import LogsProvider from "../contexts/LogsContext";

const LogStack = createStackNavigator();

const LogsNavigator = (navigation) => {
  const RenderLogScreen = (props) => <LogsScreen {...props} />;

  return (
    <LogsProvider>
      <LogStack.Navigator
        screenOptions={{ headerTitle: "", headerTransparent: true }}
      >
        <LogStack.Screen component={RenderLogScreen} name="LogsScreen" />
        <LogStack.Screen component={LogsDetail} name="LogsDetail" />
      </LogStack.Navigator>
    </LogsProvider>
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

export default LogsNavigator;
