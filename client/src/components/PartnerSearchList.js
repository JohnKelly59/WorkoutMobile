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
import { usePartners } from "../contexts/PartnersContext";
import { useSharedWorkouts } from "../contexts/SharedWorkoutsContext";
import UserContext from "../contexts/UserContext";

const PartnerSearchList = (props) => {
  const user = React.useContext(UserContext);
  const { addSharedWorkout } = useSharedWorkouts();
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
        <AlertDialog.CloseButton />
        <AlertDialog.Header backgroundColor="#CFB53B">
          Select Partners
        </AlertDialog.Header>
        <AlertDialog.Body backgroundColor="black">
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
              onPress={props.onClose}
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
                props.onClose(), dispatch(createAction("reset", []));
                props.shareWorkout(props.workout.id, user, listToAdd);
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

export default PartnerSearchList;
