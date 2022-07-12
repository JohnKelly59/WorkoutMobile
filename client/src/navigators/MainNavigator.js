import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CoverScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import RandomScreen from "../screens/RandomScreen";
import LogsNavigator from "../navigators/LogsNavigator";
import WorkoutNavigator from "../navigators/WorkoutNavigator";
import { Button, Text } from "react-native";
import {
  Ionicons,
  FontAwesome,
  Feather,
  Foundation,
  MaterialIcons,
} from "@expo/vector-icons";
import AuthContainer from "../components/AuthContainer";
import AuthContext from "../contexts/AuthContext";
import Loading from "../components/Loading";
import Error from "../components/Error";
import * as SecureStore from "expo-secure-store";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const { logout } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    });
  }, []);

  return (
    <>
      <Tab.Navigator
        initialRouteName={"Workout"}
        screenOptions={{
          tabBarActiveTintColor: "#CFB53B",
          headerTitleStyle: {
            color: "#CFB53B",
          },
          headerLeft: () => (
            <Text
              style={{ color: "#CFB53B", fontWeight: "bold", fontSize: 17 }}
            >
              {currentUser.firstName}
            </Text>
          ),
          headerRight: () => (
            <Button
              color="#CFB53B"
              title="Log Out"
              onPress={async () => {
                try {
                  setLoading(true);
                  await logout();
                } catch (e) {
                  setError(e.message);
                  setLoading(false);
                }
              }}
            />
          ),
        }}
      >
        <Tab.Screen
          name="Random"
          component={RandomScreen}
          options={{
            headerStatusBarHeight: 40,
            tabBarLabel: "Random",
            tabBarIcon: () => (
              <FontAwesome name="random" color={"#CFB53B"} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={CoverScreen}
          options={{
            headerStatusBarHeight: 40,
            tabBarLabel: "Favorites",
            tabBarIcon: () => (
              <Ionicons name="md-star" color={"#CFB53B"} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Workout"
          component={WorkoutNavigator}
          options={{
            headerStatusBarHeight: 40,
            tabBarLabel: "Home",
            tabBarIcon: () => (
              <Ionicons name="md-home" color={"#CFB53B"} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerStatusBarHeight: 40,
            tabBarLabel: "Search",
            tabBarIcon: () => (
              <Ionicons name="md-search" color={"#CFB53B"} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Logs"
          component={LogsNavigator}
          options={{
            headerStatusBarHeight: 40,
            tabBarLabel: "Logs",
            tabBarIcon: () => (
              <MaterialIcons name="notes" color={"#CFB53B"} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
      <Loading loading={loading} />
    </>
  );
};

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
});

export default MainNavigator;
