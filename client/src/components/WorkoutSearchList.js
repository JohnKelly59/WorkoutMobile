import React from "react";
import createAction from "../utils/createAction";
import { SafeAreaView } from "react-native";
import {
  FlatList,
  Box,
  HStack,
  VStack,
  Text,
  Spacer,
  Checkbox,
  AlertDialog,
  Button,
} from "native-base";
import { useWorkout } from "../contexts/WorkoutContext";

const WorkoutSearchList = (props) => {
  const [listToAdd, dispatch] = React.useReducer((listToAdd, action) => {
    switch (action.type) {
      case true:
        return [...listToAdd, action.payload];
      case false:
        return listToAdd.filter((listToAdd) => listToAdd !== action.payload);
      default:
        return listToAdd;
    }
  }, []);

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

  return (
    <AlertDialog
      style={{
        paddingTop: "50%",
        height: "80%",
        width: "100%",
      }}
      leastDestructiveRef={props.cancelRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header backgroundColor="#CFB53B">
          Select Exercise
        </AlertDialog.Header>
        <AlertDialog.Body backgroundColor="black">
          <FlatList
            backgroundColor="black"
            data={props.searchedExercises}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="1"
                pr="9"
                py="6"
              >
                <HStack space={2} justifyContent="space-between">
                  <VStack>
                    <Text
                      _dark={{
                        color: "#CFB53B",
                      }}
                      color="#CFB53B"
                      bold
                    >
                      {item.name}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Checkbox
                    size="lg"
                    _borderColor="white"
                    _icon={{ color: "black" }}
                    backgroundColor="#CFB53B"
                    onChange={(e) => {
                      dispatch(createAction(e, item.name));
                    }}
                    value={item.name}
                    accessibilityLabel="Add exercise"
                  />
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.name}
          />
        </AlertDialog.Body>
        <AlertDialog.Footer backgroundColor="#CFB53B" justifyContent="flex-end">
          <Button.Group>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={props.onClose}
              ref={props.cancelRef}
            >
              Cancel
            </Button>
            <Button
              backgroundColor="black"
              _text={{
                color: "#CFB53B",
              }}
              size="sm"
              onPress={() => {
                props.onClose(), addChosenExercise(listToAdd);
              }}
            >
              Done
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default WorkoutSearchList;
