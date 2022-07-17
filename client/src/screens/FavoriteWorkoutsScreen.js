import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ImageBackground,
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

  return (
    <>
      <ImageBackground
        source={require("../../public/images/ape.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <NativeBaseProvider>
          <HStack space={0} justifyContent="center" alignItems="center">
            <Button
              bg={"black"}
              style={{ flex: 1 }}
              borderRadius={1}
              size="lg"
              onPress={() => {
                navigation.navigate("FavoritesScreen");
              }}
            >
              Exercises
            </Button>
            <Button
              bg={"#CFB53B"}
              style={{ flex: 1 }}
              borderRadius={1}
              size="lg"
              onPress={() => navigation.navigate("FavoriteWorkoutsScreen")}
            >
              Workouts
            </Button>
          </HStack>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
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
            </View>
          </TouchableWithoutFeedback>
        </NativeBaseProvider>
      </ImageBackground>
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
