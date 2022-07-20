import React from "react";
import createAction from "../utils/createAction";
import { SafeAreaView } from "react-native";
import {
  FlatList,
  Box,
  HStack,
  VStack,
  Text,
  Spacer,
  Checkbox,
  AlertDialog,
  Button,
} from "native-base";
import { useWorkout } from "../contexts/WorkoutContext";

const DeleteDialog = (props) => {
  return (
    <AlertDialog
      style={{}}
      leastDestructiveRef={props.cancelRef2}
      isOpen={props.isDeleteOpen}
      onClose={props.onDeleteClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header backgroundColor="#CFB53B">
          Delete Account?
        </AlertDialog.Header>

        <AlertDialog.Body backgroundColor="black">
          <Text style={{ color: "white" }}>
            This will remove all data relating to {props.user.firstName}. This
            action cannot be reversed. Deleted data can not be recovered.
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer backgroundColor="#CFB53B" justifyContent="flex-end">
          <Button.Group>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={props.onDeleteClose}
              ref={props.cancelRef2}
            >
              Cancel
            </Button>
            <Button
              backgroundColor="black"
              _text={{
                color: "#CFB53B",
              }}
              size="sm"
              onPress={async () => {
                await props.deleteUser(props.user);
              }}
            >
              Delete Account
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DeleteDialog;
