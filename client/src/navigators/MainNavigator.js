import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteWorkoutsNavigator from "../navigators/FavoriteWorkoutsNavigator";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import RandomScreen from "../screens/RandomScreen";
import LogsNavigator from "../navigators/LogsNavigator";
import WorkoutNavigator from "../navigators/WorkoutNavigator";
import AccountScreen from "../screens/AccountScreen";
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
import UserContext from "../contexts/UserContext";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const { logout } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const user = React.useContext(UserContext);

  return (
    <>
      <Tab.Navigator
        initialRouteName={"Workout"}
        screenOptions={({ route, navigation }) => ({
          tabBarActiveTintColor: "#CFB53B",
          headerTitleStyle: {
            color: "#CFB53B",
          },
          headerLeft: () => (
            <Text
              style={{ color: "#CFB53B", fontWeight: "bold", fontSize: 17 }}
            >
              {user.firstName}
            </Text>
          ),
          headerRight: () => (
            <Button
              color="#CFB53B"
              title="Settings"
              onPress={() => {
                navigation.navigate("Account");
              }}
            />
          ),
        })}
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
        {user.firstName !== "Guest" ? (
          <Tab.Screen
            name="Favorites"
            component={FavoriteWorkoutsNavigator}
            options={{
              headerStatusBarHeight: 40,
              tabBarLabel: "Favorites",
              tabBarIcon: () => (
                <Ionicons name="md-star" color={"#CFB53B"} size={24} />
              ),
            }}
          />
        ) : null}
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
        {user.firstName !== "Guest" ? (
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
        ) : null}
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
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
