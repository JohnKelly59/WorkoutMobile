import React from "react";
import createAction from "../utils/createAction";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import NumericInput from "react-native-numeric-input";
import {
  View,
  Center,
  FlatList,
  Box,
  HStack,
  VStack,
  Text,
  Spacer,
  Checkbox,
  AlertDialog,
  Button,
  Heading,
  Stack,
} from "native-base";
import { useWorkout } from "../contexts/WorkoutContext";

const ChosenExercisesList = (props) => {
  const {
    setSearchedExercises,
    searchedExercises,
    workoutDuration,
    setWorkoutDuration,
    restDuration,
    setRestDuration,
    chosenExercises,
    getExerciseSearch,
    addChosenExercise,
    removeChosenExercise,
    editReps,
    editSets,
  } = useWorkout();

  const saveSet = (exerciseName, setsSelectValue) => {
    editSets(exerciseName, setsSelectValue);
  };
  const saveRep = (exerciseName, setsSelectValue) => {
    editReps(exerciseName, setsSelectValue);
  };

  const setSetNumber = (exerciseName) => {
    return (
      <Center>
        <Text style={{ color: "white" }}>Sets</Text>
        <NumericInput
          containerStyle={{ backgroundColor: "black" }}
          textColor={"#CFB53B"}
          upDownButtonsBackgroundColor="black"
          iconStyle={{ color: "#CFB53B" }}
          totalHeight={50}
          totalWidth={80}
          type="up-down"
          onChange={(value) => {
            editSets(exerciseName, value);
          }}
        />
      </Center>
    );
  };
  const setRepNumber = (exerciseName, index) => {
    return (
      <Center key={index}>
        <Text style={{ color: "white" }}>Reps</Text>
        <NumericInput
          containerStyle={{ backgroundColor: "black" }}
          textColor={"#CFB53B"}
          upDownButtonsBackgroundColor="black"
          iconStyle={{ color: "#CFB53B" }}
          totalHeight={50}
          totalWidth={80}
          type="up-down"
          onChange={(value) => editReps(exerciseName, value)}
        />
      </Center>
    );
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, name) => {
    closeRow(rowMap, name);
    removeChosenExercise(name);
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          deleteRow(rowMap, data.item.name);
        }}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, minWidth: "100%" }}>
      <Heading alignItems="center" color="#CFB53B" fontSize="xl" p="4" pb="3">
        Chosen Exercises
      </Heading>
      <SwipeListView
        previewRowKey={"0"}
        previewOpenValue={-40}
        rightOpenValue={-90}
        renderHiddenItem={renderHiddenItem}
        contentContainerStyle={{}}
        data={chosenExercises}
        renderItem={({ item, index }) => (
          <Box
            style={{ backgroundColor: "#CFB53B" }}
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="1"
            pr="9"
            py="6"
          >
            <HStack
              space={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <VStack>
                <Text
                  title="Exercise Name"
                  style={{ color: "white", maxWidth: 200 }}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  padding="0"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.name}
                </Text>
              </VStack>
              <Spacer title="Sets" />
              {setSetNumber(item.name, index)}
              {setRepNumber(item.name, index)}
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.name}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.text}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#CFB53B",
  },
  head: { height: 40, backgroundColor: "black" },
  text: { color: "white", fontSize: 20 },
  rowBack: {
    alignItems: "center",

    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backTextWhite: {
    color: "#CFB53B",
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 90,
  },
  backRightBtnRight: {
    backgroundColor: "black",
    right: 0,
  },
});

export default ChosenExercisesList;
