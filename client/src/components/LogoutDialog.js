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

const LogoutDialog = (props) => {
  return (
    <AlertDialog
      style={{
        paddingTop: "50%",
        height: "80%",
        width: "100%",
      }}
      leastDestructiveRef={props.cancelRef}
      isOpen={props.isLogoutOpen}
      onClose={props.onLogoutClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header backgroundColor="#CFB53B">
          Sign Out?
        </AlertDialog.Header>
        <AlertDialog.Body backgroundColor="black">
          <Text style={{ color: "white" }}>
            Are you sure you want to Sign Out?
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer backgroundColor="#CFB53B" justifyContent="flex-end">
          <Button.Group>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={props.onLogoutClose}
              ref={props.cancelRef}
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
                await props.logout();
              }}
            >
              Sign Out
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default LogoutDialog;
