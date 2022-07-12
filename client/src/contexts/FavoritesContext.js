import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../config";
import axios from "axios";
import createAction from "../utils/createAction";
const FavoritesContext = createContext();

FavoritesProvider = ({ children }) => {
  const [favorites, dispatch] = React.useReducer((favorites, action) => {
    switch (action.type) {
      case "SET_FAVORITES":
        return action.payload;
      case "ADD_FAVORITE":
        return [...favorites, action.payload];
      case "REMOVE_FAVORITE":
        return favorites.filter((f) => f.id !== action.payload.id);
      default:
        return favorites;
    }
  });

  const getFavorites = async () => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        let rUser = JSON.parse(user);
        axios
          .post(`${API_URL}/favorites`, {
            email: rUser.email,
          })
          .then((response) => {
            dispatch(createAction("SET_FAVORITES", response.data));
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  const addToFavorites = async (id) => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        axios
          .post(`${API_URL}/addFavorites`, {
            email: userData.email,
            id,
          })
          .then((response) => {
            getFavorites();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  const removeFavorites = async (id) => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        axios
          .post(`${API_URL}/removeFavorites`, {
            email: userData.email,
            id,
          })
          .then((response) => {
            dispatch(createAction("REMOVE_FAVORITE", id));
          })
          .catch((e) => {
            console.log(err);
            setFavoritesError("Something went wrong");
          });
      }
    });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        getFavorites,
        removeFavorites,
        addToFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

export default FavoritesProvider;
