import React, { useState, useEffect } from "react";
import { useWorkout } from "../contexts/WorkoutContext";
import CountDown from "react-native-countdown-component";
import { AlertDialog } from "native-base";
import { Vibration } from "react-native";

const CountdownTimer = (props) => {
  const [running, setRunning] = useState(true);

  let hoursToSeconds = props.setTime.hours * 60 * 60;
  let minutesToSeconds = props.setTime.minutes * 60;
  let time = hoursToSeconds + minutesToSeconds + props.setTime.seconds;

  const startTimer = () => {
    console.log(running);
    setRunning(!running);
  };

  const PATTERN = [1 * 1000];

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
        <AlertDialog.CloseButton onPress={Vibration.cancel()} />
        <AlertDialog.Header backgroundColor="#CFB53B">
          Click timer to pause
        </AlertDialog.Header>
        <AlertDialog.Body backgroundColor="#CFB53B">
          <CountDown
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            until={time}
            digitTxtStyle={{ color: "#CFB53B" }}
            digitStyle={{ backgroundColor: "black" }}
            running={running}
            timeToShow={["H", "M", "S"]}
            onFinish={() => {
              Vibration.vibrate(PATTERN, true);
            }}
            onPress={() => startTimer()}
            size={30}
          />
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default CountdownTimer;
