import React, { useEffect } from "react";
import useRandomResults from "../hooks/useRandomResults";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import FavoriteStar from "../components/FavoriteStar";
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
import { useFavorites } from "../contexts/FavoritesContext";

const RandomScreen = () => {
  const [
    randomWorkout,
    randomResults,
    randomError,
    randomFilterFunction,
    random,
  ] = useRandomResults();

  const { favorites } = useFavorites();
  const [bodyPart, setBodyPart] = React.useState("");
  const [exercises, setExercises] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const sliderWidth = Dimensions.get("window").width;
  const itemWidth = Math.round(sliderWidth * 0.8);

  const bodyParts = [
    { label: "", value: "" },
    { label: "Back", value: "back" },
    { label: "Cardio", value: "cardio" },
    { label: "Chest", value: "chest" },
    { label: "Arms", value: "arms" },
    { label: "Legs", value: "legs" },
    { label: "Shoulders", value: "shoulders" },
    { label: "Abs", value: "abs" },
  ];

  const exerciseCount = [
    { label: "", value: "" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
  ];

  const buttonTap = async () => {
    try {
      setLoading(true);
      await randomWorkout(bodyPart, exercises);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
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
                  uri: randomResults[i].gifUrl,
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
              {randomResults[i].id}
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
                (favorite) => favorite.id === randomResults[i].id
              ) ? (
                <FavoriteStar icon={"star"} id={randomResults[i].id} />
              ) : (
                <FavoriteStar icon={"staro"} id={randomResults[i].id} />
              )}
            </Center>
          </Box>
          <Stack p="4" space={1}>
            <Stack space={2}>
              <Heading size="xl" ml="-1">
                {randomResults[i].name
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
                {randomResults[i].equipment.charAt(0).toUpperCase() +
                  randomResults[i].equipment.slice(1)}
              </Text>
            </Stack>
            <Text fontWeight="400" fontSize="lg">
              {randomResults[i].bodyPart.charAt(0).toUpperCase() +
                randomResults[i].bodyPart.slice(1)}
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
                  {randomResults[i].target.charAt(0).toUpperCase() +
                    randomResults[i].target.slice(1)}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    );
  };

  return (
    <ImageBackground
      source={require("../../public/images/ape.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <NativeBaseProvider
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ScrollView>
          <Stack space={4} w="100%" alignItems="center">
            <Center>
              <Select
                textAlign="center"
                bg="#CFB53B"
                p={3}
                color="white"
                _actionSheetBody={{ h: "300" }}
                style={{ flex: 1 }}
                selectedValue={bodyPart}
                minWidth="100%"
                accessibilityLabel="Body Part"
                placeholder="Body Part"
                placeholderTextColor="white"
                _selectedItem={{
                  bg: "#CFB53B",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setBodyPart(itemValue)}
              >
                {bodyParts.map((bodyPart, i) => {
                  return (
                    <Select.Item
                      label={bodyPart.label}
                      value={bodyPart.value}
                      key={i}
                    />
                  );
                })}
              </Select>
              <Select
                textAlign="center"
                bg="#CFB53B"
                p={3}
                color="white"
                _actionSheetBody={{ h: "300" }}
                style={{ flex: 1 }}
                selectedValue={exercises}
                minWidth="100%"
                accessibilityLabel="Exercise Count"
                placeholder="Exercise Count"
                placeholderTextColor="white"
                _selectedItem={{
                  bg: "#CFB53B",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setExercises(itemValue)}
              >
                {exerciseCount.map((exercise, i) => {
                  return (
                    <Select.Item
                      label={exercise.label}
                      value={exercise.value}
                      key={i}
                    />
                  );
                })}
              </Select>
            </Center>

            <Input
              bg="#CFB53B"
              p={3}
              w={{
                base: "85%",
                md: "25%",
              }}
              variant="underlined"
              minWidth="100%"
              placeholder="Search List"
              onChangeText={(text) => randomFilterFunction(text)}
              value={random}
              underlineColorAndroid="transparent"
              placeholderTextColor="white"
              color="white"
            />

            {randomError ? <Text>{randomError}</Text> : null}
            <Error error={error} />
            {randomResults.length > 0 ? (
              <Carousel
                data={randomResults}
                renderItem={rendorCarousel}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
              />
            ) : null}
          </Stack>
        </ScrollView>
        {bodyPart === "" || exercises === "" ? null : (
          <Button
            style={styles.button}
            p={5}
            size="lg"
            minWidth="100%"
            onPress={buttonTap}
          >
            Randomize
          </Button>
        )}

        <Loading loading={loading} />
      </NativeBaseProvider>
    </ImageBackground>
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
  },
});

export default RandomScreen;
