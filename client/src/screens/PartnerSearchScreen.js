import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  FlatList,
  Box,
  Image,
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
import UserContext from "../contexts/UserContext";
import {
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { API_URL } from "../config";
const PartnerSearchScreen = (props) => {
  const {
    searchedPartners,
    setSearchedPartners,
    getUsers,
    sendPartnerRequest,
  } = usePartners();
  const user = React.useContext(UserContext);

  const [refreshing, setRefreshing] = React.useState(false);
  const [searchBar, setSearchBar] = React.useState("");

  return (
    <>
      <NativeBaseProvider
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Box alignItems="center">
          <Input
            bg="#CFB53B"
            p={3}
            w={{
              base: "85%",
              md: "25%",
            }}
            onChangeText={setSearchBar}
            minWidth="100%"
            variant="underlined"
            placeholder="Search for User"
            underlineColorAndroid="transparent"
            placeholderTextColor="white"
            color="white"
            InputRightElement={
              <Button
                bg={"black"}
                size="xs"
                rounded="none"
                w="1/6"
                h="full"
                onPress={(e) => {
                  getUsers(searchBar);
                }}
              >
                <FontAwesome5 name="search" size={24} color="#CFB53B" />
              </Button>
            }
          />
        </Box>

        {searchedPartners.length ? (
          <FlatList
            data={searchedPartners}
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
                <HStack space={2}>
                  <VStack>
                    <Image
                      size={60}
                      resizeMode={"contain"}
                      borderRadius={100}
                      source={{
                        uri: `${API_URL}/auth/profilePic/${item._id}`,
                      }}
                      fallbackSource={require("../../public/images/genericProfile.png")}
                      alt="Profile Pic"
                    />
                  </VStack>
                  <Text
                    fontSize="md"
                    style
                    _dark={{
                      color: "#CFB53B",
                    }}
                    color="#CFB53B"
                    bold
                  >
                    {item.firstName}
                  </Text>
                </HStack>
                <Button
                  backgroundColor="#CFB53B"
                  _text={{
                    color: "white",
                  }}
                  size="sm"
                  onPress={async () => {
                    sendPartnerRequest(user, item.email);
                  }}
                >
                  Send Request
                </Button>
              </Box>
            )}
            keyExtractor={(item) => item.email}
          />
        ) : null}
      </NativeBaseProvider>
    </>
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

export default PartnerSearchScreen;
