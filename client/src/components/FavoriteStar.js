import React, { useEffect, useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import FavoritesContext from "../contexts/FavoritesContext";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const FavoriteStar = (props) => {
  const { addToFavorites, removeFavorites } = useFavorites();
  const [favorited, setFavorited] = useState(props.icon);

  const favoriteOrNot = async () => {
    if (favorited === "star") {
      await removeFavorites(props.id);
      setFavorited("staro");
    } else if (favorited === "staro") {
      await addToFavorites(props.id);
      setFavorited("star");
    }
  };

  return (
    <>
      <AntDesign
        name={favorited}
        size={24}
        color="black"
        onPress={async () => {
          try {
            favoriteOrNot();
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </>
  );
};

export default FavoriteStar;
