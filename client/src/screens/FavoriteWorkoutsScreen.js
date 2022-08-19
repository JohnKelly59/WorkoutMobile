import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import {
  Spacer,
  Input,
  Heading,
  AspectRatio,
  Image,
  Icon,
  Stack,
  Box,
  Select,
  Center,
  HStack,
  CheckIcon,
  NativeBaseProvider,
  Button,
} from "native-base";
import FavoriteWorkout from "../components/FavoriteWorkout";
import NotFound from "../components/NotFound";
import SearchBar from "../components/SearchBar";
import { useFavoriteWorkouts } from "../contexts/FavoriteWorkoutsContext";

const reverseData = (data) => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const FavoriteWorkoutsScreen = ({ navigation }) => {
  const [greet, setGreet] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);

  const {
    favoriteWorkouts,
    setFavoriteWorkouts,
    getFavoriteWorkouts,
    removeFavoriteWorkout,
    addFavoriteWorkout,
  } = useFavoriteWorkouts();
  const [refreshing, setRefreshing] = React.useState(false);
  const reverseFavoriteWorkouts = reverseData(favoriteWorkouts);

  const openFavoriteWorkout = (favoriteWorkout) => {
    console.log(favoriteWorkout);
    navigation.navigate("FavoriteWorkoutsDetail", { favoriteWorkout });
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNotFound(false);
      return await getFavoriteWorkouts();
    }
    const filteredFavoriteWorkouts = favoriteWorkouts.filter(
      (favoriteWorkout) => {
        if (favoriteWorkout.title.toLowerCase().includes(text.toLowerCase())) {
          return favoriteWorkout;
        }
      }
    );

    if (filteredFavoriteWorkouts.length) {
      setFavoriteWorkouts([...filteredFavoriteWorkouts]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await getFavoriteWorkouts();
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false), getFavoriteWorkouts();
    });
  }, []);

  useEffect(() => {
    getFavoriteWorkouts();
  }, []);

  return (
    <>
      <NativeBaseProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.container}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {favoriteWorkouts.length ? (
              <SearchBar
                value={searchQuery}
                onChangeText={handleOnSearchInput}
                containerStyle={{ marginVertical: 15 }}
                onClear={handleOnClear}
              />
            ) : null}

            {resultNotFound ? (
              <NotFound />
            ) : (
              <FlatList
                data={reverseFavoriteWorkouts}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginBottom: 15,
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <FavoriteWorkout
                    onPress={() => openFavoriteWorkout(item)}
                    item={item}
                  />
                )}
              />
            )}

            {!favoriteWorkouts.length ? (
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  styles.emptyHeaderContainer,
                ]}
              >
                <Text style={styles.emptyHeader}>No Saved Workouts</Text>
              </View>
            ) : null}
          </ScrollView>
        </TouchableWithoutFeedback>
      </NativeBaseProvider>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
    color: "white",
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
    color: "white",
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default FavoriteWorkoutsScreen;
