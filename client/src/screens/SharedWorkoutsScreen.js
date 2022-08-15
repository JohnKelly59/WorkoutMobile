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
import SharedWorkout from "../components/SharedWorkout";
import NotFound from "../components/NotFound";
import SearchBar from "../components/SearchBar";
import { useSharedWorkouts } from "../contexts/SharedWorkoutsContext";
import UserContext from "../contexts/UserContext";

const reverseData = (data) => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const SharedWorkoutsScreen = ({ navigation }) => {
  const [greet, setGreet] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);
  const user = React.useContext(UserContext);
  const {
    sharedWorkouts,
    setSharedWorkouts,
    getSharedWorkouts,
    removeSharedWorkout,
    addSharedWorkout,
  } = useSharedWorkouts();

  const reverseSharedWorkouts = reverseData(sharedWorkouts);

  const openSharedWorkout = (sharedWorkout) => {
    console.log(sharedWorkout);
    navigation.navigate("SharedWorkoutsDetail", { sharedWorkout });
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNotFound(false);
      return await getSharedWorkouts();
    }
    const filteredSharedWorkouts = sharedWorkouts.filter((sharedWorkout) => {
      if (sharedWorkout.title.toLowerCase().includes(text.toLowerCase())) {
        return sharedWorkout;
      }
    });

    if (filteredSharedWorkouts.length) {
      setSharedWorkouts([...filteredSharedWorkouts]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await getSharedWorkouts();
  };

  return (
    <>
      <ImageBackground
        source={require("../../public/images/ape.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <NativeBaseProvider>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              {sharedWorkouts.length ? (
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
                  data={reverseSharedWorkouts}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <SharedWorkout
                      onPress={() => openSharedWorkout(item)}
                      item={item}
                    />
                  )}
                />
              )}

              {!sharedWorkouts.length ? (
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

export default SharedWorkoutsScreen;
