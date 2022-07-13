import React, { useEffect, useCallback } from "react";
import Loading from "../components/Loading";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import { TimePicker, ValueMap } from "react-native-simple-time-picker";

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
import { useWorkout } from "../contexts/WorkoutContext";
import WorkoutSearchList from "../components/WorkoutSearchList";
import ChosenExercisesTable from "../components/ChosenExercisesTable";

const WorkoutSettingsTimeScreen = (props) => {
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

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

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
  } = useWorkout();

  const durationDateChange = (e) => {
    console.log(e);
    setWorkoutDuration(e);
  };

  const restDateChange = (e) => {
    setRestDuration(e);
  };

  const selectedSearchParam = async (param) => {
    setSearchParam(param);
    getExerciseSearch(param);
    setIsOpen(!isOpen);
  };

  return (
    <ImageBackground
      source={require("../../public/images/ape.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <NativeBaseProvider
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ScrollView>
          <Stack space={4} w="100%" style={{ paddingBottom: 100 }}>
            <Heading
              alignItems="center"
              color="#CFB53B"
              fontSize="xl"
              p="4"
              pb="3"
            >
              Workout Duration
            </Heading>
            <View style={styles.rnDateTimePicker}>
              <TimePicker
                defaultValue={{ hours: 0, minutes: 0, seconds: 0 }}
                hoursUnit="Hours"
                minutesUnit="Minutes"
                secondsUnit="Seconds"
                value={workoutDuration}
                onChange={(e) => durationDateChange(e)}
                textColor="white"
                pickerShows={["hours", "minutes", "seconds"]}
              />
            </View>

            <Heading
              alignItems="center"
              color="#CFB53B"
              fontSize="xl"
              p="4"
              pb="3"
            >
              Rest Between Sets
            </Heading>
            <View style={styles.rnDateTimePicker}>
              <TimePicker
                defaultValue={{ hours: 0, minutes: 0, seconds: 0 }}
                hoursUnit="Hours"
                minutesUnit="Minutes"
                secondsUnit="Seconds"
                value={restDuration}
                onChange={(e) => restDateChange(e)}
                textColor="white"
                pickerShows={["hours", "minutes", "seconds"]}
              />
            </View>
          </Stack>
        </ScrollView>
        <WorkoutSearchList
          searchedExercises={searchedExercises}
          isOpen={isOpen}
          onClose={onClose}
          cancelRef={cancelRef}
        />

        {chosenExercises.length > 0 ? (
          <Button
            onPress={() => props.navigation.navigate("WorkoutScreen")}
            style={styles.button}
            p={5}
            size="lg"
            minWidth="100%"
          >
            Begin Training
          </Button>
        ) : null}

        <Loading loading={loading} />
      </NativeBaseProvider>
    </ImageBackground>
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
  rnDateTimePicker: {
    borderColor: "white",
    backgroundColor: "#CFB53B",
    fontColor: "white",
    flex: 1,
    borderWidth: 1,
  },
  text: { color: "#CFB53B", fontSize: 20, paddingTop: 20 },
});

export default WorkoutSettingsTimeScreen;
