import React from "react";
import MainNavigator from "./src/navigators/MainNavigator";
import AuthNavigator from "./src/navigators/AuthNavigator";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import AuthContext from "./src/contexts/AuthContext";
import FavoritesContext from "./src/contexts/FavoritesContext";
import FavoritesListContext from "./src/contexts/FavoritesContext";
import useAuth from "./src/hooks/useAuth";
import { StatusBar, TextView } from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import { createStackNavigator } from "@react-navigation/stack";
import UserContext from "./src/contexts/UserContext";
import FavoritesProvider from "./src/contexts/FavoritesContext";

const RootStack = createStackNavigator();

const App = () => {
  const { auth, state } = useAuth();
  const scheme = useColorScheme();
  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name={"Splash"} component={SplashScreen} />;
    }

    return state.user ? (
      <RootStack.Screen name={"Main"}>
        {() => (
          <UserContext.Provider value={state.user}>
            <FavoritesProvider>
              <MainNavigator />
            </FavoritesProvider>
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    ) : (
      <RootStack.Screen name={"Auth"} component={AuthNavigator} />
    );
  }

  return (
    <AuthContext.Provider value={auth}>
      <StatusBar
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
      />
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}
        >
          {renderScreens()}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
