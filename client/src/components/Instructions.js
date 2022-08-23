import React, { useEffect, useState } from "react";
import { Button, AlertDialog } from "native-base";

const Instructions = (props) => {
  return (
    <AlertDialog isOpen={props.start} onClose={props.onStart}>
      <AlertDialog.Content>
        <AlertDialog.Header>Instructions</AlertDialog.Header>
        <AlertDialog.Body>
          When the "Begin Workout" button is clicked, the workout out timer will
          start. To view and edit your progress on a particular exercise, simply
          flip the exercise card by clicking the arrow on the top right corner.
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              style={{ backgroundColor: "#CFB53B" }}
              minWidth="100%"
              onPress={props.onStart}
            >
              Begin Workout
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default Instructions;
