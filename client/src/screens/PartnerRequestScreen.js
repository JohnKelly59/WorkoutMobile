import React, { useEffect, useState } from "react";
import createAction from "../utils/createAction";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  Heading,
  NativeBaseProvider,
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
import UserContext from "../contexts/UserContext";

const PartnerRequestScreen = (props) => {
  const {
    getPartnerRequests,
    partnerRequests,
    setPartnerRequests,
    acceptPartnerRequest,
    denyPartnerRequest,
    cancelPartnerRequest,
  } = usePartners();
  const user = React.useContext(UserContext);
  const cancelRef = React.useRef(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false), getPartnerRequests(user);
    });
  }, []);

  useEffect(() => {
    getPartnerRequests(user);
  }, []);

  return (
    <ImageBackground
      source={require("../../public/images/ape.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <NativeBaseProvider
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {Object.keys(partnerRequests).length !== 0 ? (
            <>
              <Heading
                alignItems="center"
                color="#CFB53B"
                fontSize="xl"
                p="4"
                pb="3"
              >
                Received
              </Heading>
              {}
              <FlatList
                backgroundColor="black"
                data={partnerRequests.received.filter((o) => {
                  if (o.requester !== null) {
                    return o;
                  }
                })}
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
                    {console.log("itemhere: ", item)}
                    <HStack space={2} justifyContent="space-between">
                      <VStack>
                        <Text
                          _dark={{
                            color: "#CFB53B",
                          }}
                          color="#CFB53B"
                          bold
                        >
                          {item.requester.email}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Button
                        backgroundColor="black"
                        _text={{
                          color: "#CFB53B",
                        }}
                        size="sm"
                        onPress={async () => {
                          denyPartnerRequest(user, item.requester.email);
                        }}
                      >
                        Deny
                      </Button>
                      <Button
                        backgroundColor="black"
                        _text={{
                          color: "#CFB53B",
                        }}
                        size="sm"
                        onPress={async () => {
                          acceptPartnerRequest(user, item.requester.email);
                        }}
                      >
                        Accept
                      </Button>
                    </HStack>
                  </Box>
                )}
                keyExtractor={(item) => item.requested.email}
              />
            </>
          ) : null}
          {Object.keys(partnerRequests).length !== 0 ? (
            <>
              <Heading
                alignItems="center"
                color="#CFB53B"
                fontSize="xl"
                p="4"
                pb="3"
              >
                Sent
              </Heading>
              <FlatList
                backgroundColor="black"
                data={partnerRequests.sent}
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
                          {item.requested.email}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Button
                        backgroundColor="black"
                        _text={{
                          color: "#CFB53B",
                        }}
                        size="sm"
                        onPress={async () => {
                          cancelPartnerRequest(user, item.requested.email);
                        }}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  </Box>
                )}
                keyExtractor={(item) => item.requested.email}
              />
            </>
          ) : null}
        </ScrollView>
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

export default PartnerRequestScreen;
