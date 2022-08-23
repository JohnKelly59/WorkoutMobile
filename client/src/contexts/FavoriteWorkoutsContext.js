import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../config";
import axios from "axios";
const FavoriteWorkoutsContext = createContext();

const FavoriteWorkoutsProvider = ({ children }) => {
  const [favoriteWorkouts, setFavoriteWorkouts] = useState([]);
  const [favoriteWorkoutsExerciseCards, setFavoriteWorkoutsExerciseCards] =
    useState([]);

  const getFavoriteWorkouts = async () => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        axios
          .post(`${API_URL}/favoriteWorkouts`, {
            email: userData.email,
          })
          .then((response) => {
            setFavoriteWorkouts(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  const addFavoriteWorkout = async (favWorkout) => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        axios
          .post(`${API_URL}/addFavoriteWorkout`, {
            email: userData.email,
            id: favWorkout.id,
            title: favWorkout.title,
            exercises: favWorkout.exercises,
            time: favWorkout.time,
          })
          .then((response) => {
            getFavoriteWorkouts();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  const removeFavoriteWorkout = async (favWorkout) => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        axios
          .post(`${API_URL}/removeFavoriteWorkout`, {
            email: userData.email,
            title: favWorkout.title,
          })
          .then((response) => {
            getFavoriteWorkouts();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  const getFavoriteWorkoutsExerciseCards = async (exercises) => {
    let results = await axios.post(`${API_URL}/favoriteWorkoutExerciseCards`, {
      exercises: exercises,
    });
    setFavoriteWorkoutsExerciseCards(results.data);
  };

  useEffect(() => {
    getFavoriteWorkouts();
  }, []);

  return (
    <FavoriteWorkoutsContext.Provider
      value={{
        favoriteWorkouts,
        setFavoriteWorkouts,
        getFavoriteWorkouts,
        removeFavoriteWorkout,
        addFavoriteWorkout,
        favoriteWorkoutsExerciseCards,
        getFavoriteWorkoutsExerciseCards,
      }}
    >
      {children}
    </FavoriteWorkoutsContext.Provider>
  );
};

export const useFavoriteWorkouts = () => useContext(FavoriteWorkoutsContext);

export default FavoriteWorkoutsProvider;
