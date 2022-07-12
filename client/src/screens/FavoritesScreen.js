import React, { useEffect } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
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
import { MaterialIcons } from "@expo/vector-icons";
import { useFavorites } from "../contexts/FavoritesContext";

const FavoritesScreen = () => {
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
        <ScrollView>
          <Stack space={4} w="100%" alignItems="center">
            {favorites.length > 0 ? (
              <Input
                bg="#CFB53B"
                p={3}
                w={{
                  base: "85%",
                  md: "25%",
                }}
                placeholder="Search List"
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholderTextColor="white"
                color="white"
              />
            ) : null}
            <Error error={error} />
            {favorites.map((result, i) => {
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
  },
});

export default FavoritesScreen;
