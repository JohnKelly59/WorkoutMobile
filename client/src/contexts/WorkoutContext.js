import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../config";
import axios from "axios";
import createAction from "../utils/createAction";
const WorkoutContext = createContext();

const WorkoutProvider = ({ children }) => {
  const [workoutDuration, setWorkoutDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [restDuration, setRestDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [searchedExercises, setSearchedExercises] = useState([]);
  const [chosenExerciseCards, setChosenExerciseCards] = useState([]);

  const [chosenExercises, dispatch] = React.useReducer(
    (chosenExercises, action) => {
      switch (action.type) {
        case "SET_CHOSEN_EXERCISES":
          return action.payload;
        case "ADD_CHOSEN_EXERCISE":
          return [...chosenExercises, action.payload];
        case "REMOVE_CHOSEN_EXERCISES":
          return chosenExercises.filter(
            (exercise) => exercise.name !== action.payload
          );
        case "EDIT_SETS":
          objIndex = chosenExercises.findIndex(
            (exercise) => exercise.name === action.payload.name
          );
          chosenExercises[objIndex].sets = action.payload.sets;
          return chosenExercises;
        case "EDIT_REPS":
          objIndex = chosenExercises.findIndex(
            (exercise) => exercise.name === action.payload.name
          );
          chosenExercises[objIndex].reps = action.payload.reps;
          return chosenExercises;
        default:
          return chosenExercises;
      }
    },
    []
  );

  const getExerciseSearch = async (target) => {
    let searchList = await axios.post(`${API_URL}/workoutsearch`, { target });

    setSearchedExercises(searchList.data);
  };

  const setChosenExercises = async () => {
    try {
      dispatch(createAction("SET_CHOSEN_EXERCISES", []));
    } catch (err) {
      console.error(err);
    }
  };

  const addChosenExercise = async (exercises) => {
    exercises.forEach((exercise) => {
      let chosenExercise = {
        name: exercise,
        sets: 1,
        reps: 1,
      };
      try {
        dispatch(createAction("ADD_CHOSEN_EXERCISE", chosenExercise));
      } catch (err) {
        console.error(err);
      }
    });
  };

  const removeChosenExercise = async (exercise) => {
    try {
      dispatch(createAction("REMOVE_CHOSEN_EXERCISES", exercise));
    } catch (err) {
      console.error(err);
    }
  };

  const editSets = async (exerciseName, setsSelectValue) => {
    let payload = {
      name: exerciseName,
      sets: setsSelectValue,
    };

    try {
      dispatch(createAction("EDIT_SETS", payload));
    } catch (err) {
      console.error(err);
    }
  };

  const editReps = async (exerciseName, setsSelectValue) => {
    let payload = {
      name: exerciseName,
      reps: setsSelectValue,
    };

    try {
      dispatch(createAction("EDIT_REPS", payload));
    } catch (err) {
      console.error(err);
    }
  };

  const getChosenExerciseCards = async (chosenExercises) => {
    let results = await axios.post(`${API_URL}/exerciseCards`, {
      chosenExercises,
    });
    setChosenExerciseCards(results.data);
  };

  const startOver = () => {
    setWorkoutDuration({ hours: 0, minutes: 0, seconds: 0 });
    setRestDuration({ hours: 0, minutes: 0, seconds: 0 });
    setSearchedExercises([]);
    setChosenExerciseCards([]);
    setChosenExercises();
  };

  useEffect(() => {
    setChosenExercises;
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
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
        getChosenExerciseCards,
        chosenExerciseCards,
        startOver,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);

export default WorkoutProvider;
