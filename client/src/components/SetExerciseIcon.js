import React, { useEffect, useState } from "react";
import { useWorkout } from "../contexts/WorkoutContext";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const SetExercisesIcon = (props) => {
  const { addChosenExercise, removeChosenExercise } = useWorkout();

  const [included, setIncluded] = useState(props.icon);

  const includeOrNot = async () => {
    if (included === "minus") {
      await removeChosenExercise(props.name);
      setIncluded("plus");
    } else if (included === "plus") {
      await addChosenExercise(props.name);
      setIncluded("minus");
    }
  };

  return (
    <>
      <AntDesign
        name={included}
        size={24}
        color="black"
        onPress={async () => {
          try {
            includeOrNot();
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </>
  );
};

export default SetExercisesIcon;
