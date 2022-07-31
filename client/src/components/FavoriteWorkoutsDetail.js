import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import RoundIconBtn from "./RoundIconBtn";
import Carousel from "react-native-snap-carousel";
import { useFavoriteWorkouts } from "../contexts/FavoriteWorkoutsContext";
import { useFavorites } from "../contexts/FavoritesContext";
import FavoriteStar from "../components/FavoriteStar";
import Error from "../components/Error";
import Loading from "../components/Loading";
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
  Spacer,
} from "native-base";

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const FavoriteWorkoutsDetail = (props) => {
  const { favorites } = useFavorites();
  const [favoriteWorkout, setFavoriteWorkout] = useState(
    props.route.params.favoriteWorkout
  );
  const {
    removeFavoriteWorkout,
    favoriteWorkoutsExerciseCards,
    getFavoriteWorkoutsExerciseCards,
  } = useFavoriteWorkouts();
  const [showModal, setShowModal] = useState(false);
  const sliderWidth = Dimensions.get("window").width;
  const itemWidth = Math.round(sliderWidth * 0.8);

  const deleteFavoriteWorkout = async () => {
    removeFavoriteWorkout(favoriteWorkout);
    props.navigation.navigate("FavoriteWorkoutsScreen");
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are You Sure!",
      "This action will delete this workout permanently!",
      [
        {
          text: "Delete",
          onPress: deleteFavoriteWorkout,
        },
        {
          text: "No Thanks",
          onPress: () => console.log("no thanks"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  useEffect(() => {
    getFavoriteWorkoutsExerciseCards(favoriteWorkout.exercises);
  }, []);

  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
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
            <AspectRatio w="100%" ratio={10 / 9}>
              <Image
                source={{
                  uri: favoriteWorkoutsExerciseCards[i].gifUrl,
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
              {favoriteWorkoutsExerciseCards[i].id}
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
              {favorites.some(
                (favorite) =>
                  favorite.id === favoriteWorkoutsExerciseCards[i].id
              ) ? (
                <FavoriteStar
                  icon={"star"}
                  id={favoriteWorkoutsExerciseCards[i].id}
                />
              ) : (
                <FavoriteStar
                  icon={"staro"}
                  id={favoriteWorkoutsExerciseCards[i].id}
                />
              )}
            </Center>
          </Box>
          <Stack p="4" space={1}>
            <Stack space={2}>
              <Heading size="xl" ml="-1">
                {favoriteWorkoutsExerciseCards[i].name
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
                {favoriteWorkoutsExerciseCards[i].equipment
                  .charAt(0)
                  .toUpperCase() +
                  favoriteWorkoutsExerciseCards[i].equipment.slice(1)}
              </Text>
            </Stack>
            <Text fontWeight="400" fontSize="lg">
              {favoriteWorkoutsExerciseCards[i].bodyPart
                .charAt(0)
                .toUpperCase() +
                favoriteWorkoutsExerciseCards[i].bodyPart.slice(1)}
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
                  {favoriteWorkoutsExerciseCards[i].target
                    .charAt(0)
                    .toUpperCase() +
                    favoriteWorkoutsExerciseCards[i].target.slice(1)}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <NativeBaseProvider>
        <ScrollView contentContainerStyle={[styles.container]}>
          <Text style={styles.time}>{`Completed At ${formatDate(
            favoriteWorkout.time
          )}`}</Text>
          <Spacer p={2} />
          <Carousel
            data={favoriteWorkoutsExerciseCards}
            renderItem={rendorCarousel}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
          />
        </ScrollView>
        <View style={styles.btnContainer}>
          <RoundIconBtn
            antIconName="delete"
            style={{ marginBottom: 15 }}
            onPress={displayDeleteAlert}
          />
        </View>
      </NativeBaseProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 50,

    paddingHorizontal: 15,
  },
  title: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  desc: {
    paddingTop: 5,
    fontSize: 20,
    opacity: 0.6,
    color: "white",
    textAlign: "center",
  },
  time: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    opacity: 0.5,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});

export default FavoriteWorkoutsDetail;
