import React, { useEffect } from "react";
import useSearchResults from "../hooks/useSearchResults";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
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
import FavoriteStar from "../components/FavoriteStar";
import UserContext from "../contexts/UserContext";

const SearchScreen = () => {
  const [
    searchWorkout,
    searchResults,
    searchError,
    searchFilterFunction,
    search,
    resetSearch,
  ] = useSearchResults();
  const { favorites } = useFavorites();
  const [bodyPart, setBodyPart] = React.useState("");
  const [targetMuscle, setTargetMuscle] = React.useState("");
  const [equipment, setEquipment] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const user = React.useContext(UserContext);

  const bodyParts = [
    { label: "", value: "" },
    { label: "Back", value: "back" },
    { label: "Cardio", value: "cardio" },
    { label: "Chest", value: "chest" },
    { label: "Lower Arms", value: "lower arms" },
    { label: "Lower Legs", value: "lower legs" },
    { label: "Neck", value: "neck" },
    { label: "Shoulders", value: "shoulders" },
    { label: "Upper Arms", value: "upper arms" },
    { label: "Upper Legs", value: "upper legs" },
    { label: "Waist", value: "waist" },
  ];
  const targetMuscles = [
    { label: "", value: "" },
    { label: "Abductors", value: "abductors" },
    { label: "Abs", value: "abs" },
    { label: "Adductors", value: "adductors" },
    { label: "Biceps", value: "biceps" },
    { label: "Calves", value: "calves" },
    { label: "Cardiovascular System", value: "cardiovascular system" },
    { label: "Delts", value: "delts" },
    { label: "Forearms", value: "forearms" },
    { label: "Glutes", value: "glutes" },
    { label: "Hamstrings", value: "hamstrings" },
    { label: "Lats", value: "lats" },
    { label: "Leator Scapulae", value: "leator Scapulae" },
    { label: "Pectorals", value: "pectorals" },
    { label: "Quads", value: "quads" },
    { label: "Serratus Anterior", value: "serratus anterior" },
    { label: "Spine", value: "spine" },
    { label: "Traps", value: "traps" },
    { label: "Triceps", value: "triceps" },
    { label: "Upper Back", value: "upper back" },
  ];

  const equipments = [
    { label: "", value: "" },
    { label: "Assisted", value: "assisted" },
    { label: "Band", value: "band" },
    { label: "Barbell", value: "barbell" },
    { label: "Body Weight", value: "body weight" },
    { label: "Bosu Ball", value: "bosu ball" },
    { label: "Cable", value: "cable" },
    { label: "Dumbbell", value: "dumbbell" },
    { label: "Eliptical Machine", value: "eliptical machine" },
    { label: "EZ Barbell", value: "ez barbell" },
    { label: "Hammer", value: "hammer" },
    { label: "Kettlebell", value: "kettlebell" },
    { label: "Leverage Machine", value: "leverage machine" },
    { label: "Medicine Ball", value: "medicine ball" },
    { label: "Olympic Barbell", value: "olympic barbell" },
    { label: "Reisitance Band", value: "reisitance band" },
    { label: "Roller", value: "roller" },
    { label: "Rope", value: "rope" },
    { label: "Skierg Machine", value: "skierg machine" },
    { label: "Sled Machine", value: "sled machine" },
    { label: "Smith Machine", value: "smith machine" },
    { label: "Stability Ball", value: "stability ball" },
    { label: "Stationary Bike", value: "stationary bike" },
    { label: "Stepmill Machine", value: "stepmill machine" },
    { label: "Tire", value: "tire" },
    { label: "Trap Bar", value: "trap bar" },
    { label: "Upper Body Ergometer", value: "upper body ergometer" },
    { label: "Weighted", value: "weighed" },
    { label: "Wheel Roller", value: "wheel roller" },
  ];

  const buttonTap = async () => {
    try {
      setLoading(true);
      searchResults.length > 0
        ? resetSearch()
        : await searchWorkout(bodyPart, targetMuscle, equipment);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
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
              selectedValue={targetMuscle}
              minWidth="100%"
              accessibilityLabel="Target"
              placeholderTextColor="white"
              placeholder="Target"
              _selectedItem={{
                bg: "#CFB53B",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setTargetMuscle(itemValue)}
            >
              {targetMuscles.map((targetMuscle, i) => {
                return (
                  <Select.Item
                    label={targetMuscle.label}
                    value={targetMuscle.value}
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
              selectedValue={equipment}
              minWidth="100%"
              accessibilityLabel="Equipment"
              placeholder="Equipment"
              placeholderTextColor="white"
              _selectedItem={{
                bg: "#CFB53B",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setEquipment(itemValue)}
            >
              {equipments.map((equipment, i) => {
                return (
                  <Select.Item
                    label={equipment.label}
                    value={equipment.value}
                    key={i}
                  />
                );
              })}
            </Select>
          </Center>

          {searchResults.length > 0 ? (
            <Input
              bg="#CFB53B"
              p={3}
              w={{
                base: "85%",
                md: "25%",
              }}
              minWidth="100%"
              variant="underlined"
              placeholder="Search List"
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholderTextColor="white"
              color="white"
            />
          ) : null}
          {searchError ? <Text>{searchError}</Text> : null}
          <Error error={error} />
          {searchResults.map((result, i) => {
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
                          uri: result.gifUrl,
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
                      {result.id}
                    </Center>
                    {user.firstName !== "Guest" ? (
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
                          (favorite) => favorite.id === result.id
                        ) ? (
                          <FavoriteStar icon={"star"} id={result.id} />
                        ) : (
                          <FavoriteStar icon={"staro"} id={result.id} />
                        )}
                      </Center>
                    ) : null}
                  </Box>
                  <Stack p="4" space={1}>
                    <Stack space={2}>
                      <Heading size="xl" ml="-1">
                        {result.name
                          .toLowerCase()
                          .split(" ")
                          .map(
                            (s) => s.charAt(0).toUpperCase() + s.substring(1)
                          )
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
                        {result.equipment.charAt(0).toUpperCase() +
                          result.equipment.slice(1)}
                      </Text>
                    </Stack>
                    <Text fontWeight="400" fontSize="lg">
                      {result.bodyPart.charAt(0).toUpperCase() +
                        result.bodyPart.slice(1)}
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
                          {result.target.charAt(0).toUpperCase() +
                            result.target.slice(1)}
                        </Text>
                      </HStack>
                    </HStack>
                  </Stack>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </ScrollView>
      {bodyPart === "" && equipment === "" && targetMuscle === "" ? null : (
        <Button
          style={styles.button}
          p={5}
          size="lg"
          minWidth="100%"
          onPress={buttonTap}
        >
          {searchResults.length > 0 ? "Reset" : "Search"}
        </Button>
      )}

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
  },
});

export default SearchScreen;
