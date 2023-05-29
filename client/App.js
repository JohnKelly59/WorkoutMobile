import React from "react";
import MainNavigator from "./src/navigators/MainNavigator";
import AuthNavigator from "./src/navigators/AuthNavigator";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  CommonActions,
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
import ParnersProvider from "./src/contexts/PartnersContext";
import SharedWorkoutsProvider from "./src/contexts/SharedWorkoutsContext";
import useSearchResults from "./src/hooks/useSearchResults";
import useRandomResults from "./src/hooks/useRandomResults";

const RootStack = createStackNavigator();

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const { auth, state } = useAuth();
  const scheme = useColorScheme();
  const [
    searchWorkout,
    searchResults,
    searchError,
    searchFilterFunction,
    search,
    resetSearch,
  ] = useSearchResults();
  const [setRandomResults] = useRandomResults();

  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name={"Splash"} component={SplashScreen} />;
    }

    return state.user ? (
      <RootStack.Screen name={"Main"}>
        {() => (
          <UserContext.Provider value={state.user}>
            <ParnersProvider>
              <SharedWorkoutsProvider>
                <FavoritesProvider>
                  <MainNavigator />
                </FavoritesProvider>
              </SharedWorkoutsProvider>
            </ParnersProvider>
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
      <NavigationContainer
        // ref={navigationRef}
        // onReady={() =>
        //   (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        // }
        // onStateChange={() => {
        //   const previousRouteName = routeNameRef.current;
        //   const currentRouteName = navigationRef.current.getCurrentRoute().name;

        //   if (previousRouteName !== currentRouteName) {
        //     console.log(
        //       `The route changed to ${currentRouteName}`,
        //     );
        //   }

        //   // Save the current route name for later comparision
        //   routeNameRef.current = currentRouteName;
        // }}
        theme={scheme === "dark" ? DarkTheme : DefaultTheme}
      >
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
