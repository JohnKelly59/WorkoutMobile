import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [search, setSearch] = useState("");

  const searchWorkout = async (bodyPart, targetMuscle, equipment) => {
    try {
      await axios
        .post(`${API_URL}/search`, {
          bodyPart,
          targetMuscle,
          equipment,
        })
        .then((response) => {
          setSearchResults(response.data[0]);
        });
    } catch (err) {
      console.log(err);
      setSearchError("Something went wrong");
    }
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = searchResults.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchResults(newData);
      setSearch(text);
    } else {
      setSearch(text);
    }
  };

  return [
    searchWorkout,
    searchResults,
    searchError,
    searchFilterFunction,
    search,
  ];
};
