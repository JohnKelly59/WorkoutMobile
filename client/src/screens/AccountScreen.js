import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import AuthContainer from "../components/AuthContainer";
import AuthContext from "../contexts/AuthContext";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { usePartners } from "../contexts/PartnersContext";
import {
  Image,
  Input,
  Text,
  Icon,
  Stack,
  Center,
  Box,
  NativeBaseProvider,
  Button,
  Heading,
} from "native-base";
import useAuth from "../hooks/useAuth";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import DeleteDialog from "../components/DeleteDialog";
import LogoutDialog from "../components/LogoutDialog";
import UserContext from "../contexts/UserContext";

const AccountScreen = ({ navigation }) => {
  const { logout, deleteUser } = React.useContext(AuthContext);
  const { uploadPic, profilePic, profilePicture, pic, setPic, deletePic } =
    usePartners();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const user = React.useContext(UserContext);
  const [isLogoutOpen, setIsLogoutOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const cancelRef = React.useRef(null);
  const cancelRef2 = React.useRef(null);
  const [image, setImage] = useState(null);
  const onLogoutClose = () => setIsLogoutOpen(false);
  const onDeleteClose = () => setIsDeleteOpen(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPic(result.uri);
      uploadPic(result, user);
    }
  };

  useEffect(() => {
    profilePic(user);
    console.log("picHere: ", pic);
  }, []);

  return (
    <>
      <NativeBaseProvider>
        <View style={styles.container}>
          <Box>
            <Center>
              <Image
                size={150}
                resizeMode={"contain"}
                borderRadius={100}
                source={
                  user.firstName === "Guest" || pic === null
                    ? require("../../public/images/genericProfile.png")
                    : { uri: pic }
                }
                alt="Profile Picture"
              />
            </Center>
            {user.firstName === "Guest" ? (
              <Button
                p={7}
                size="lg"
                minWidth="100%"
                style={styles.button}
                onPress={() => {
                  logout();
                }}
              >
                Sign in
              </Button>
            ) : (
              <>
                <Heading style={styles.heading}>{user.email}</Heading>
                {pic === null ? (
                  <Button
                    style={styles.pictureButton}
                    size="md"
                    variant="outline"
                    onPress={pickImage}
                  >
                    <Text style={{ color: "#CFB53B" }}>
                      Upload Profile Picture
                    </Text>
                  </Button>
                ) : (
                  <Button
                    style={styles.pictureButton}
                    size="md"
                    variant="outline"
                    onPress={() => {
                      deletePic(user);
                    }}
                  >
                    <Text style={{ color: "#CFB53B" }}>
                      Delete Profile Picture
                    </Text>
                  </Button>
                )}

                <Button
                  p={5}
                  size="lg"
                  minWidth="100%"
                  style={styles.button}
                  onPress={() => {
                    setIsLogoutOpen(!isLogoutOpen);
                  }}
                >
                  Log Out
                </Button>

                <Button
                  p={2}
                  size="lg"
                  minWidth="100%"
                  style={styles.signin}
                  onPress={() => {
                    setIsDeleteOpen(!isDeleteOpen);
                  }}
                >
                  Delete Account
                </Button>
                <Button
                  style={styles.pictureButton}
                  size="md"
                  variant="outline"
                  onPress={() => {
                    console.log(pic);
                    profilePicture();
                  }}
                >
                  <Text style={{ color: "#CFB53B" }}>Get Picture</Text>
                </Button>
              </>
            )}
          </Box>
        </View>
        <LogoutDialog
          logout={logout}
          isLogoutOpen={isLogoutOpen}
          onLogoutClose={onLogoutClose}
          cancelRef={cancelRef}
        />
        <DeleteDialog
          user={user}
          deleteUser={deleteUser}
          isDeleteOpen={isDeleteOpen}
          onDeleteClose={onDeleteClose}
          cancelRef2={cancelRef2}
        />
      </NativeBaseProvider>
      <Loading loading={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "white",
    backgroundColor: "black",
    textAlign: "center",
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
  pictureButton: {
    backgroundColor: "black",
    color: "#CFB53B",
    borderRadius: 0,
  },
  button: {
    backgroundColor: "#CFB53B",
    borderRadius: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signin: {
    backgroundColor: "#CFB53B",
    borderRadius: 0,
  },
});

export default AccountScreen;
