import React, { useEffect } from "react";
import createAction from "../utils/createAction";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import {
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

const PartnersScreen = (props) => {
  const { getPartners, partners, removePartner, setPartners } = usePartners();
  const user = React.useContext(UserContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [partnerRemove, setPartnerRemove] = React.useState({});

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false), getPartners(user);
    });
  }, []);

  const partnerToRemove = (partner) => {
    setPartnerRemove(partner);
    setIsOpen(!isOpen);
  };

  const remove = async () => {
    removePartner(user, partnerRemove).then((e) => {
      getPartners(user);
      setIsOpen(!isOpen);
      setPartnerRemove({});
    });
  };

  useEffect(() => {
    getPartners(user);
  }, []);

  return (
    <NativeBaseProvider
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {partners.length ? (
          <FlatList
            backgroundColor="black"
            data={partners}
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
                      {item.email}
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
                      partnerToRemove(item.email);
                    }}
                  >
                    Remove
                  </Button>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.email}
          />
        ) : null}

        <AlertDialog
          style={{
            paddingTop: "50%",
            height: "80%",
            width: "100%",
          }}
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header backgroundColor="#CFB53B">
              Are you sure?
            </AlertDialog.Header>
            <AlertDialog.Body backgroundColor="black">
              <Text style={{ color: "white" }}>
                You and your partner will no longer be able to share workouts.
                All workouts previosuly shared will also be deleted.
              </Text>
            </AlertDialog.Body>
            <AlertDialog.Footer
              backgroundColor="#CFB53B"
              justifyContent="flex-end"
            >
              <Button.Group>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button
                  backgroundColor="black"
                  _text={{
                    color: "#CFB53B",
                  }}
                  size="sm"
                  onPress={async () => {
                    remove();
                  }}
                >
                  Remove
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </ScrollView>
    </NativeBaseProvider>
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

export default PartnersScreen;
