import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SavedWorkoutsNavigator from "../navigators/SavedWorkoutsNavigator";
import SearchNavigator from "../navigators/SearchNavigator";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import RandomScreen from "../screens/RandomScreen";
import LogsNavigator from "../navigators/LogsNavigator";
import MoreNavigator from "../navigators/MoreNavigator";
import PartnerNavigator from "../navigators/PartnerNavigator";
import WorkoutNavigator from "../navigators/WorkoutNavigator";
import AccountScreen from "../screens/AccountScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import { Button, Text } from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
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
        {user.firstName !== "Guest" ? (
          <Tab.Screen
            name="Partners"
            component={PartnerNavigator}
            options={{
              headerStatusBarHeight: 40,
              tabBarLabel: "Partners",
              tabBarIcon: () => (
                <Ionicons name="people-sharp" color={"#CFB53B"} size={24} />
              ),
            }}
          />
        ) : null}
        {user.firstName !== "Guest" ? (
          <Tab.Screen
            name="Workouts"
            component={SavedWorkoutsNavigator}
            options={{
              headerStatusBarHeight: 40,
              tabBarLabel: "Workouts",
              tabBarIcon: () => (
                <MaterialIcons
                  name="fitness-center"
                  color={"#CFB53B"}
                  size={24}
                />
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
          component={SearchNavigator}
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
            name="More"
            component={MoreNavigator}
            options={{
              headerStatusBarHeight: 40,
              tabBarLabel: "More",
              tabBarIcon: () => (
                <Feather name="more-horizontal" size={24} color={"#CFB53B"} />
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
