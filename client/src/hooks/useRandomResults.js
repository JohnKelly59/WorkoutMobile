import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
export default () => {
  const [randomResults, setRandomResults] = useState([]);
  const [randomError, setRandomError] = useState("");
  const [random, setRandom] = useState("");

  const randomWorkout = async (bodyPart, exercises) => {
    try {
      await axios
        .post(`${API_URL}/random`, {
          bodyPart,
          exercises,
        })
        .then((response) => {
          setRandomResults(response.data);
        });
    } catch (err) {
      console.log(err);
      setRandomError("Something went wrong");
    }
  };

  const randomFilterFunction = (text) => {
    // Check if randomed text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = randomResults.filter(function (item) {
        // Applying filter for the inserted text in random bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setRandomResults(newData);
      setRandom(text);
    } else {
      setRandom(text);
    }
  };

  const resetRandom = async () => {
    setRandomResults([]);
  };

  return [
    randomWorkout,
    randomResults,
    randomError,
    randomFilterFunction,
    random,
    resetRandom,
  ];
};
