import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import AuthContainer from "../components/AuthContainer";
import AuthContext from "../contexts/AuthContext";
import Loading from "../components/Loading";
import Error from "../components/Error";
import {
  Input,
  Text,
  Icon,
  Stack,
  Center,
  Box,
  NativeBaseProvider,
  Button,
} from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import DeleteDialog from "../components/DeleteDialog";
import LogoutDialog from "../components/LogoutDialog";
import UserContext from "../contexts/UserContext";

const AccountScreen = ({ navigation }) => {
  const { logout, deleteUser } = React.useContext(AuthContext);
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const user = React.useContext(UserContext);
  const [isLogoutOpen, setIsLogoutOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const cancelRef = React.useRef(null);
  const cancelRef2 = React.useRef(null);

  const onLogoutClose = () => setIsLogoutOpen(false);
  const onDeleteClose = () => setIsDeleteOpen(false);

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
          <Text style={{ color: "white" }}>{user.email}</Text>
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
            </>
          )}
        </ScrollView>
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
    marginTop: 200,
    backgroundColor: "#CFB53B",
    flex: 1,
    borderRadius: 0,
  },
  signin: {
    marginTop: 0,
    backgroundColor: "#CFB53B",
    borderRadius: 0,
  },
});

export default AccountScreen;
