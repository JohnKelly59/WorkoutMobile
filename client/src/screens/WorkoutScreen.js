import React, { useEffect, useRef } from "react";
import Loading from "../components/Loading";
import CountdownTimer from "../components/CountdownTimer";
import Instructions from "../components/Instructions";
import SaveWorkout from "../components/SaveWorkout";
import ShareCurrentWorkout from "../components/ShareCurrentWorkout";
import CountDown from "react-native-countdown-component";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Alert,
  RefreshControl,
  Vibration,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CardFlip from "react-native-card-flip";
import { useWorkout } from "../contexts/WorkoutContext";
import UserContext from "../contexts/UserContext";
import { usePartners } from "../contexts/PartnersContext";
import { useFavoriteWorkouts } from "../contexts/FavoriteWorkoutsContext";
import Carousel from "react-native-snap-carousel";
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

const WorkoutScreen = ({ navigation }) => {
  const {
    chosenExerciseCards,
    getChosenExerciseCards,
    setSearchedExercises,
    searchedExercises,
    workoutDuration,
    setWorkoutDuration,
    restDuration,
    setRestDuration,
    chosenExercises,
    getExerciseSearch,
    addChosenExercise,
    editReps,
    editSets,
    startOver,
  } = useWorkout();
  const { partners } = usePartners();
  const { addFavoriteWorkout } = useFavoriteWorkouts();

  useEffect(() => {
    getChosenExerciseCards(chosenExercises);
  }, []);

  let hoursToSeconds = workoutDuration.hours * 60 * 60;
  let minutesToSeconds = workoutDuration.minutes * 60;
  let time = hoursToSeconds + minutesToSeconds + workoutDuration.seconds;
  const cancelRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const sliderWidth = Dimensions.get("window").width;
  const itemWidth = Math.round(sliderWidth * 0.8);
  let refs = useRef([React.createRef(), React.createRef()]);
  const countdownRef = useRef([React.createRef(), React.createRef()]);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const [start, setStart] = React.useState(true);
  const [running, setRunning] = React.useState(false);
  const [end, setEnd] = React.useState(false);
  const onEnd = () => setEnd(false);
  const onStart = () => {
    setStart(false), setRunning(true);
  };
  const [title, setTitle] = React.useState("");
  const user = React.useContext(UserContext);
  const [share, setShare] = React.useState(false);
  const shareClose = () => setShare(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const PATTERN = [1 * 1000];

  const needTitleAlert = () => {
    Alert.alert("Wait!", "You need a title to save a workout.", [
      {
        text: "OK",
        onPress: () => console.log("ok"),
      },
    ]);
  };

  const signInAlert = () => {
    Alert.alert("Wait!", "You need to be signed in to save workouts.", [
      {
        text: "OK",
        onPress: () => console.log("ok"),
      },
    ]);
  };

  const handleOnSubmit = async () => {
    if (title === "") {
      needTitleAlert();
    } else if (user.firstName === "Guest") {
      signInAlert();
    } else {
      const favoriteWorkout = {
        id: Date.now(),
        title: title,
        exercises: chosenExercises,
        time: Date.now(),
      };
      addFavoriteWorkout(favoriteWorkout).then((e) => {
        startOver();
        navigation.navigate("HomeScreen");
      });
    }
  };

  const openTimer = (e) => {
    if (e === true) {
      setIsOpen(true);
    }
  };

  const displayEndAlert = () => {
    setEnd(true);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false), setShare(true);
    });
  }, []);

  const rendorCarousel = ({ index }) => {
    let i = index;
    return (
      <CardFlip
        style={styles.cardContainer}
        ref={(card) => (refs.current[i] = card)}
      >
        <Box style={{ paddingTop: 20 }}>
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
                <AspectRatio w="100%" ratio={3 / 4}>
                  <Image
                    source={{
                      uri: chosenExerciseCards[i].gifUrl,
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
                  {chosenExerciseCards[i].id}
                </Center>
                <TouchableOpacity
                  onPress={() => refs.current[i].flip()}
                  style={styles.touchable}
                >
                  <Ionicons name="arrow-redo" size={50} color="black" />
                </TouchableOpacity>
              </Box>
              <Stack p="4" space={1}>
                <Stack space={2}>
                  <Heading size="xl" ml="-1">
                    {chosenExerciseCards[i].name
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
                    {chosenExerciseCards[i].equipment.charAt(0).toUpperCase() +
                      chosenExerciseCards[i].equipment.slice(1)}
                  </Text>
                </Stack>
                <Text fontWeight="400" fontSize="lg">
                  {chosenExerciseCards[i].bodyPart.charAt(0).toUpperCase() +
                    chosenExerciseCards[i].bodyPart.slice(1)}
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
                      {chosenExerciseCards[i].target.charAt(0).toUpperCase() +
                        chosenExerciseCards[i].target.slice(1)}
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box style={{ paddingTop: 20 }}>
          <Box style={styles.card}>
            {" "}
            <TouchableOpacity
              onPress={() => refs.current[i].flip()}
              style={styles.touchable}
            >
              <Ionicons
                onPress={() => refs.current[i].flip()}
                name="arrow-redo"
                size={50}
                color="black"
                styles={{ right: 0 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              {chosenExerciseCards[i].name}
            </Text>
            <Center
              pl="10"
              w="64"
              h="20"
              rounded="md"
              shadow={3}
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ flex: 1, fontSize: 32 }}>
                {chosenExercises[i].sets} Sets
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 32,
                }}
              >
                {chosenExercises[i].reps} Reps
              </Text>
            </Center>
            <ScrollView>
              {[...Array(parseInt(chosenExercises[i].sets))].map((e, j) => {
                return (
                  <>
                    <HStack pl={2} pr={2} space={3} justifyContent="center">
                      <Center
                        style={{ flex: 1 }}
                        bg={"black"}
                        w="64"
                        h="20"
                        rounded="0"
                        shadow={3}
                      >
                        <View p={4} key={j} style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              flex: 1,
                              color: "#CFB53B",
                              fontSize: 24,
                            }}
                          >
                            Set {j + 1}
                          </Text>

                          <Checkbox
                            onChange={(e) => openTimer(e)}
                            size="lg"
                            _borderColor="white"
                            _icon={{ color: "black" }}
                            backgroundColor="#CFB53B"
                            accessibilityLabel="Add exercise"
                          />
                        </View>
                      </Center>
                    </HStack>
                    <Divider />
                  </>
                );
              })}
            </ScrollView>
            <CountdownTimer
              isOpen={isOpen}
              onClose={onClose}
              setTime={restDuration}
            />
          </Box>
        </Box>
      </CardFlip>
    );
  };

  return (
    <NativeBaseProvider
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Stack space={4} w="100%" alignItems="center">
          <Carousel
            data={chosenExerciseCards}
            renderItem={rendorCarousel}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </Stack>
      </ScrollView>

      <Button
        style={styles.button}
        p={1}
        size="lg"
        minWidth="100%"
        onPress={displayEndAlert}
      >
        <Center
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ paddingRight: 20, fontSize: 30 }}>End Workout</Text>
          <CountDown
            until={time}
            digitTxtStyle={{ color: "black" }}
            digitStyle={{ backgroundColor: "#CFB53B" }}
            running={running}
            timeToShow={["H", "M", "S"]}
            onFinish={() => {
              Alert.alert("Time!", "Workout Duration Reached", [
                {
                  text: "OK",
                  onPress: () => Vibration.cancel(),
                  style: "done",
                },
              ]),
                Vibration.vibrate(PATTERN, true);
            }}
            size={20}
          />
        </Center>
      </Button>
      <Instructions start={start} onStart={onStart} />
      <SaveWorkout
        end={end}
        onEnd={onEnd}
        startOver={startOver}
        navigation={navigation}
        handleOnSubmit={handleOnSubmit}
        setTitle={setTitle}
      />
      <ShareCurrentWorkout
        signInAlert={signInAlert}
        needTitleAlert={needTitleAlert}
        share={share}
        shareClose={shareClose}
        partners={partners}
        cancelRef={cancelRef}
        chosenExercises={chosenExercises}
      />
      <Loading loading={loading} />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#CFB53B",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#CFB53B",
    position: "absolute",
    bottom: 0,
    borderColor: "white",
    borderWidth: 1,
  },
  cardContainer: {
    width: 320,
    height: 700,
  },
  card: {
    width: 320,
    height: 580,
    backgroundColor: "#CFB53B",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
  },
  touchable: {
    alignSelf: "flex-end",
    marginTop: -5,
    position: "absolute",
  },
});

export default WorkoutScreen;
