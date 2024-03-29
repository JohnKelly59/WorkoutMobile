import React, { useEffect, useCallback } from "react";
import Loading from "../components/Loading";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { TimePicker, ValueMap } from "react-native-simple-time-picker";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  FlatList,
  VStack,
  Spacer,
  Input,
  Heading,
  AspectRatio,
  Image,
  Icon,
  Stack,
  Box,
  Text,
  Select,
  AlertDialog,
  Center,
  HStack,
  CheckIcon,
  NativeBaseProvider,
  Button,
  Checkbox,
} from "native-base";
import { useFavorites } from "../contexts/FavoritesContext";
import UserContext from "../contexts/UserContext";
import { useWorkout } from "../contexts/WorkoutContext";
import { useFavoriteWorkouts } from "../contexts/FavoriteWorkoutsContext";
import { useSharedWorkouts } from "../contexts/SharedWorkoutsContext";
import WorkoutSearchList from "../components/WorkoutSearchList";
import FavoritesSearchList from "../components/FavoritesSearchList";

const WorkoutSettingsScreen = (props) => {
  const targetMuscles = [
    { label: "", value: "" },
    { label: "Abductors", value: "abductors" },
    { label: "Abs", value: "abs" },
    { label: "Adductors", value: "adductors" },
    { label: "Biceps", value: "biceps" },
    { label: "Calves", value: "calves" },
    { label: "Cardiovascular System", value: "cardiovascular system" },
    { label: "Delts", value: "delts" },
    { label: "Forearms", value: "forearms" },
    { label: "Glutes", value: "glutes" },
    { label: "Hamstrings", value: "hamstrings" },
    { label: "Lats", value: "lats" },
    { label: "Leator Scapulae", value: "leator Scapulae" },
    { label: "Pectorals", value: "pectorals" },
    { label: "Quads", value: "quads" },
    { label: "Serratus Anterior", value: "serratus anterior" },
    { label: "Spine", value: "spine" },
    { label: "Traps", value: "traps" },
    { label: "Triceps", value: "triceps" },
    { label: "Upper Back", value: "upper back" },
  ];

  const searchOptions = [
    { label: "", value: "" },
    { label: "Search by Exercises", value: "Search by Exercises" },
    { label: "Favorite Exercises", value: "Favorite Exercises" },
    { label: "Favorite Workouts", value: "Favorite Workouts" },
    { label: "Shared Workouts", value: "Shared Workouts" },
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const [isFavoriteOpen, setIsFavoriteOpen] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const onFavoriteClose = () => setIsFavoriteOpen(false);
  const cancelRef2 = React.useRef(null);
  const [searchOptionParam, setSearchOptionParam] = React.useState("");
  const [searchParam, setSearchParam] = React.useState("");
  const [favoriteParam, setFavoritehParam] = React.useState("");
  const [favWorkoutParam, setFavWorkoutParam] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const {
    searchedExercises,
    workoutDuration,
    setWorkoutDuration,
    restDuration,
    setRestDuration,
    chosenExercises,
    getExerciseSearch,
    addChosenExercise,
    setSearchedExercises,
  } = useWorkout();
  const { favorites, getFavorites } = useFavorites();
  const { sharedWorkouts, getSharedWorkouts } = useSharedWorkouts();
  const { favoriteWorkouts, getFavoriteWorkouts } = useFavoriteWorkouts();
  const user = React.useContext(UserContext);

  const durationDateChange = (e) => {
    setWorkoutDuration(e);
  };

  const restDateChange = (e) => {
    setRestDuration(e);
  };

  const selectedSearchParam = async (param) => {
    setSearchParam(param);
    getExerciseSearch(param);
    setLoading(true);
    wait(1000)
      .then(() => {
        setIsOpen(!isOpen);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const selectSearchOptionParam = async (param) => {
    setSearchedExercises([]);
    onClose();
    onFavoriteClose();
    setSearchOptionParam(param);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false),
        getFavoriteWorkouts(),
        getSharedWorkouts(user),
        getFavorites();
    });
  }, []);

  return (
    <NativeBaseProvider
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Stack space={4} w="100%" style={{ paddingBottom: 100 }}>
          <HStack
            w="100%"
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Heading
              alignItems="center"
              color="#CFB53B"
              fontSize="xl"
              p="4"
              pb="3"
            >
              Search Options
            </Heading>
            <Button
              onPress={() => props.navigation.navigate("Chosen Exercises")}
              style={styles.infoBtn}
            >
              <AntDesign color={"white"} name={"info"} size={20} />
            </Button>
          </HStack>
          <Select
            textAlign="center"
            bg="#CFB53B"
            p={3}
            color="white"
            _actionSheetBody={{ h: "300" }}
            style={{ flex: 1 }}
            selectedValue={searchOptionParam}
            minWidth="100%"
            accessibilityLabel="Search Param"
            placeholder="Select Search Option"
            placeholderTextColor="white"
            _selectedItem={{
              bg: "#CFB53B",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => selectSearchOptionParam(itemValue)}
          >
            {searchOptions.map((searchOption, i) => {
              return (
                <Select.Item
                  label={searchOption.label}
                  value={searchOption.value}
                  key={i}
                />
              );
            })}
          </Select>

          {searchOptionParam === "Search by Exercises" ? (
            <>
              <Heading
                alignItems="center"
                color="#CFB53B"
                fontSize="xl"
                p="4"
                pb="3"
              >
                Search For Exercise
              </Heading>
              <Select
                textAlign="center"
                bg="#CFB53B"
                p={3}
                color="white"
                _actionSheetBody={{ h: "300" }}
                style={{ flex: 1 }}
                selectedValue={searchParam}
                minWidth="100%"
                accessibilityLabel="Search Param"
                placeholder="Search for Exercise"
                placeholderTextColor="white"
                _selectedItem={{
                  bg: "#CFB53B",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => selectedSearchParam(itemValue)}
              >
                {targetMuscles.map((muscle, i) => {
                  return (
                    <Select.Item
                      label={muscle.label}
                      value={muscle.value}
                      key={i}
                    />
                  );
                })}
              </Select>
            </>
          ) : null}
          {searchOptionParam === "Favorite Exercises" ? (
            <>
              <Heading
                alignItems="center"
                color="#CFB53B"
                fontSize="xl"
                p="4"
                pb="3"
              >
                Favorite Exercises
              </Heading>
              <Button
                style={styles.favoritesButton}
                onPress={() => setIsFavoriteOpen(!isFavoriteOpen)}
                p={2}
                size="md"
                minWidth="100%"
              >
                Favorite Exercises
              </Button>
            </>
          ) : null}
          {searchOptionParam === "Favorite Workouts" ? (
            <>
              <Heading
                alignItems="center"
                color="#CFB53B"
                fontSize="xl"
                p="4"
                pb="3"
              >
                Favorite Workouts
              </Heading>
              <Select
                textAlign="center"
                bg="#CFB53B"
                p={3}
                color="white"
                _actionSheetBody={{ h: "300" }}
                style={{ flex: 1 }}
                selectedValue={searchParam}
                minWidth="100%"
                accessibilityLabel="Workouts"
                placeholder="Favorite Workouts"
                placeholderTextColor="white"
                _selectedItem={{
                  bg: "#CFB53B",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={async (itemValue) => {
                  let picked = await favoriteWorkouts[itemValue].exercises.map(
                    (exercise) => {
                      return exercise.name;
                    }
                  );
                  addChosenExercise(picked);
                }}
              >
                {favoriteWorkouts.map((favWorkout, i) => {
                  return (
                    <Select.Item label={favWorkout.title} value={i} key={i} />
                  );
                })}
              </Select>
            </>
          ) : null}
          {searchOptionParam === "Shared Workouts" ? (
            <>
              <Heading
                alignItems="center"
                color="#CFB53B"
                fontSize="xl"
                p="4"
                pb="3"
              >
                Shared Workouts
              </Heading>
              <Select
                textAlign="center"
                bg="#CFB53B"
                p={3}
                color="white"
                _actionSheetBody={{ h: "300" }}
                style={{ flex: 1 }}
                selectedValue={searchParam}
                minWidth="100%"
                accessibilityLabel="Workouts"
                placeholder="Shared Workouts"
                placeholderTextColor="white"
                _selectedItem={{
                  bg: "#CFB53B",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={async (itemValue) => {
                  let picked = await sharedWorkouts[itemValue].exercises.map(
                    (exercise) => {
                      return exercise.name;
                    }
                  );
                  addChosenExercise(picked);
                }}
              >
                {sharedWorkouts.map((shaWorkout, i) => {
                  return (
                    <Select.Item label={shaWorkout.title} value={i} key={i} />
                  );
                })}
              </Select>
            </>
          ) : null}
        </Stack>
      </ScrollView>
      <WorkoutSearchList
        searchedExercises={searchedExercises}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      />
      {isFavoriteOpen ? (
        <FavoritesSearchList
          favorite={favorites}
          isOpen={isFavoriteOpen}
          onClose={onFavoriteClose}
          cancelRef={cancelRef2}
        />
      ) : null}

      {chosenExercises.length > 0 ? (
        <Button
          onPress={() => props.navigation.navigate("WorkoutSettingsTimeScreen")}
          style={styles.button}
          p={5}
          size="lg"
          minWidth="100%"
        >
          Next
        </Button>
      ) : null}

      <Loading loading={loading} />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#CFB53B",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    borderColor: "white",
    backgroundColor: "#CFB53B",
    position: "absolute",
    bottom: 0,
    borderColor: "white",
    borderWidth: 1,
  },
  favoritesButton: {
    backgroundColor: "#CFB53B",
  },
  rnDateTimePicker: {
    borderColor: "white",
    backgroundColor: "#CFB53B",
    fontColor: "white",
    flex: 1,
    borderWidth: 1,
  },
  text: { color: "#CFB53B", fontSize: 20, paddingTop: 20 },
  infoBtn: {
    borderColor: "white",
    backgroundColor: "#CFB53B",

    bottom: 0,
    borderColor: "white",
    borderWidth: 1,
  },
});

export default WorkoutSettingsScreen;
