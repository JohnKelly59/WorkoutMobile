import React, { useEffect } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  View,
  Text,
} from "react-native";
import FavoriteStar from "../components/FavoriteStar";
import {
  Spacer,
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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useFavorites } from "../contexts/FavoritesContext";

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useFavorites();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [search, setSearch] = React.useState("");
  return (
    <ImageBackground
      source={require("../../public/images/ape.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <NativeBaseProvider
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <HStack space={0} justifyContent="center" alignItems="center">
          <Button bg={"#CFB53B"} style={{ flex: 1 }} borderRadius={1} size="lg">
            Exercises
          </Button>
          <Button
            bg={"black"}
            style={{ flex: 1 }}
            borderRadius={1}
            size="lg"
            onPress={() => {
              navigation.navigate("FavoriteWorkoutsScreen");
            }}
          >
            Workouts
          </Button>
        </HStack>
        <ScrollView>
          <Stack space={3} w="100%" alignItems="center">
            <Error error={error} />
            {favorites.length <= 0 ? (
              <View style={styles.emptyHeaderContainer}>
                <Text style={styles.emptyHeader}>No Favorites</Text>
              </View>
            ) : (
              favorites.map((result, i) => {
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
                      </Box>
                      <Stack p="4" space={1}>
                        <Stack space={2}>
                          <Heading size="xl" ml="-1">
                            {result.name
                              .toLowerCase()
                              .split(" ")
                              .map(
                                (s) =>
                                  s.charAt(0).toUpperCase() + s.substring(1)
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
              })
            )}
          </Stack>
        </ScrollView>
        <Loading loading={loading} />
      </NativeBaseProvider>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
    color: "white",
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
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
  },
});

export default FavoritesScreen;
