import React, { useEffect, useState } from "react";
import {
  Input,
  Heading,
  AspectRatio,
  Image,
  Icon,
  Stack,
  Box,
  Select,
  Center,
  HStack,
  CheckIcon,
  NativeBaseProvider,
  Button,
  VStack,
  Checkbox,
  View,
  Divider,
  AlertDialog,
  useColorModeValue,
} from "native-base";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Alert,
  Vibration,
} from "react-native";

const SaveWorkout = (props) => {
  return (
    <AlertDialog
      style={{
        paddingTop: "50%",
        height: "80%",
        width: "100%",
      }}
      isOpen={props.end}
      onClose={props.onEnd}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header backgroundColor="#CFB53B">
          Finished?
        </AlertDialog.Header>
        <AlertDialog.Body backgroundColor="black">
          <Text style={{ color: "white" }}>
            Do you want to save this workout?
          </Text>
          <Input
            placeholder="Insert Workout Name"
            placeholderTextColor="white"
            color="white"
            onChangeText={props.setTitle}
          />
        </AlertDialog.Body>
        <AlertDialog.Footer backgroundColor="#CFB53B" justifyContent="flex-end">
          <Button.Group>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={() => {
                props.startOver(), props.navigation.navigate("HomeScreen");
              }}
            >
              Don't Save
            </Button>
            <Button
              backgroundColor="black"
              _text={{
                color: "#CFB53B",
              }}
              size="sm"
              onPress={async () => {
                props.handleOnSubmit();
              }}
            >
              Save
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default SaveWorkout;
