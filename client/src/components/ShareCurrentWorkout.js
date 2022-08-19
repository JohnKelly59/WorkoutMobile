import React from "react";
import createAction from "../utils/createAction";
import { SafeAreaView, View, Alert } from "react-native";
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
  Input,
} from "native-base";
import { usePartners } from "../contexts/PartnersContext";
import { useSharedWorkouts } from "../contexts/SharedWorkoutsContext";
import UserContext from "../contexts/UserContext";

const ShareCurrentWorkout = (props) => {
  const user = React.useContext(UserContext);
  const { shareCurrentWorkout } = useSharedWorkouts();
  const [listToAdd, dispatch] = React.useReducer((listToAdd, action) => {
    switch (action.type) {
      case true:
        return [...listToAdd, action.payload];
      case false:
        return listToAdd.filter((listToAdd) => listToAdd !== action.payload);
      default:
        return listToAdd;
      case "reset":
        return [];
    }
  }, []);

  const success = () => {
    Alert.alert("Success", "Workout has been shared", [
      {
        text: "OK",
        onPress: () => console.log("ok"),
      },
    ]);
  };

  const noPartnersAlert = () => {
    Alert.alert("Oops!", "No partners have been selected", [
      {
        text: "OK",
        onPress: () => console.log("ok"),
      },
    ]);
  };

  const handleOnSubmit = async () => {
    if (title === "") {
      props.needTitleAlert();
    } else if (user.firstName === "Guest") {
      props.signInAlert();
    } else if (listToAdd.length <= 0) {
      noPartnersAlert();
    } else {
      success();
      props.shareClose(), dispatch(createAction("reset", []));
      shareCurrentWorkout(props.chosenExercises, user, listToAdd, title);
    }
  };

  const [title, setTitle] = React.useState("");
  return (
    <AlertDialog
      style={{
        paddingTop: "50%",
        height: "80%",
        width: "100%",
      }}
      leastDestructiveRef={props.cancelRef}
      isOpen={props.share}
      onClose={props.shareClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header backgroundColor="#CFB53B">
          Share Workout
        </AlertDialog.Header>
        <AlertDialog.Body backgroundColor="black">
          <View>
            <Input
              placeholder="Insert Workout Name"
              placeholderTextColor="white"
              color="white"
              onChangeText={setTitle}
            />
          </View>
          <FlatList
            backgroundColor="black"
            data={props.partners}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="1"
                pr="9"
                py="6"
              >
                <HStack space={2} justifyContent="space-between">
                  <VStack>
                    <Text
                      _dark={{
                        color: "#CFB53B",
                      }}
                      color="#CFB53B"
                      bold
                    >
                      {item.email}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Checkbox
                    size="lg"
                    _borderColor="white"
                    _icon={{ color: "black" }}
                    backgroundColor="#CFB53B"
                    onChange={(e) => {
                      dispatch(createAction(e, item.email));
                    }}
                    value={item.name}
                    accessibilityLabel="Add exercise"
                  />
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.name}
          />
        </AlertDialog.Body>
        <AlertDialog.Footer backgroundColor="#CFB53B" justifyContent="flex-end">
          <Button.Group>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={props.shareClose}
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
              onPress={() => {
                handleOnSubmit();
              }}
            >
              Send
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ShareCurrentWorkout;
