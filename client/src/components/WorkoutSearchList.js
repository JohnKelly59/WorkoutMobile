import React from "react";
import createAction from "../utils/createAction";
import Loading from "./Loading";
import { SafeAreaView, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import {
  Input,
  Heading,
  AspectRatio,
  Image,
  Icon,
  Stack,
  Box,
  Text,
  Select,
  Center,
  HStack,
  CheckIcon,
  NativeBaseProvider,
  Button,
} from "native-base";
import SetExerciseIcon from "./SetExerciseIcon";
import { useWorkout } from "../contexts/WorkoutContext";

const WorkoutSearchList = (props) => {
  const [loading, setLoading] = React.useState(false);

  const sliderWidth = Dimensions.get("window").width;
  const itemWidth = Math.round(sliderWidth * 0.8);

  const {
    setSearchedExercises,
    searchedExercises,
    workoutDuration,
    setWorkoutDuration,
    restDuration,
    setRestDuration,
    chosenExercises,
    getExerciseSearch,
    addChosenExercise,
    removeChosenExercise,
    editReps,
    editSets,
  } = useWorkout();

  const [search, setSearch] = React.useState("");
  const [filtered, setFiltered] = React.useState("");
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const filterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = searchedExercises.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFiltered(newData);
      setSearch(text);
    } else {
      setFiltered(searchedExercises);
      setSearch(text);
    }
  };

  const rendorCarousel = ({ index }) => {
    let i = index;
    return (
      <Box alignItems="center" key={i}>
        <Box
          maxW="80"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: searchedExercises[i].gifUrl,
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              bg="#CFB53B"
              _dark={{
                bg: "#CFB53B",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              {searchedExercises[i].id}
            </Center>

            <Center
              bg="#CFB53B"
              _dark={{
                bg: "#CFB53B",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              top="0"
              right="0"
              px="3"
              py="1.5"
            >
              {chosenExercises.some(
                (exercise) => exercise.id === searchedExercises[i].name
              ) ? (
                <SetExerciseIcon
                  icon={"minus"}
                  name={searchedExercises[i].name}
                />
              ) : (
                <SetExerciseIcon
                  icon={"plus"}
                  name={searchedExercises[i].name}
                />
              )}
            </Center>
          </Box>
          <Stack p="4" space={1}>
            <Stack space={2}>
              <Heading size="xl" ml="-1">
                {searchedExercises[i].name
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </Heading>
              <Text
                fontSize="md"
                _light={{
                  color: "#CFB53B",
                }}
                _dark={{
                  color: "#CFB53B",
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                {searchedExercises[i].equipment.charAt(0).toUpperCase() +
                  searchedExercises[i].equipment.slice(1)}
              </Text>
            </Stack>
            <Text fontWeight="400" fontSize="lg">
              {searchedExercises[i].bodyPart.charAt(0).toUpperCase() +
                searchedExercises[i].bodyPart.slice(1)}
            </Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text
                  fontSize="lg"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  fontWeight="400"
                >
                  {searchedExercises[i].target.charAt(0).toUpperCase() +
                    searchedExercises[i].target.slice(1)}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    );
  };

  React.useEffect(() => {
    setLoading(true);
    wait(1000).then(() => {
      filterFunction(), setLoading(false);
    });
  }, searchedExercises);

  return (
    <>
      {searchedExercises.length > 0 ? (
        <Carousel
          data={searchedExercises}
          renderItem={rendorCarousel}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
      ) : null}
    </>
  );
};

export default WorkoutSearchList;
