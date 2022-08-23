import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../config";
import axios from "axios";
import UserContext from "../contexts/UserContext";
const SharedWorkoutsContext = createContext();

const SharedWorkoutsProvider = ({ children }) => {
  const [sharedWorkouts, setSharedWorkouts] = useState([]);
  const [sharedWorkoutsExerciseCards, setSharedWorkoutsExerciseCards] =
    useState([]);
  const user = React.useContext(UserContext);

  const getSharedWorkouts = async (user) => {
    axios
      .post(`${API_URL}/sharedWorkouts`, {
        user: user.email,
      })
      .then((response) => {
        setSharedWorkouts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addSharedWorkout = async (workout, user, partner) => {
    axios
      .post(`${API_URL}/addSharedWorkout`, {
        user: user.email,
        partner,
        workout,
      })
      .then((response) => {
        getSharedWorkouts(user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addPartnerSharedWorkout = async (workout, user, partner) => {
    axios
      .post(`${API_URL}/addPartnerSharedWorkout`, {
        user: user.email,
        partner,
        workout,
      })
      .then((response) => {
        getSharedWorkouts(user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeSharedWorkout = async (workout, user, partner) => {
    axios
      .post(`${API_URL}/removeSharedWorkout`, {
        user: user.email,
        partner,
        workout,
      })
      .then((response) => {
        getSharedWorkouts(user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getSharedWorkoutsExerciseCards = async (exercises) => {
    let results = await axios.post(`${API_URL}/favoriteWorkoutExerciseCards`, {
      exercises: exercises,
    });
    setSharedWorkoutsExerciseCards(results.data);
  };

  const shareCurrentWorkout = async (exercises, user, partners, title) => {
    axios
      .post(`${API_URL}/shareCurrentWorkout`, {
        user: user.email,
        partners,
        exercises,
        title,
      })
      .then((response) => {
        getSharedWorkouts(user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSharedWorkouts(user);
  }, []);

  return (
    <SharedWorkoutsContext.Provider
      value={{
        getSharedWorkouts,
        sharedWorkouts,
        addSharedWorkout,
        removeSharedWorkout,
        getSharedWorkoutsExerciseCards,
        sharedWorkoutsExerciseCards,
        setSharedWorkoutsExerciseCards,
        shareCurrentWorkout,
        addPartnerSharedWorkout,
      }}
    >
      {children}
    </SharedWorkoutsContext.Provider>
  );
};

export const useSharedWorkouts = () => useContext(SharedWorkoutsContext);

export default SharedWorkoutsProvider;
