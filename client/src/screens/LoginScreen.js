import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
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

const LoginScreen = ({ navigation }) => {
  const { login } = React.useContext(AuthContext);
  const [loginUsername, setLoginUsername] = React.useState(null);
  const [loginPassword, setLoginPassword] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  return (
    <ImageBackground
      source={require("../../public/images/ape.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <AuthContainer>
        <NativeBaseProvider>
          <Stack space={4} w="100%" alignItems="center">
            <Error error={error} />
            <Input
              style={styles.input}
              onChangeText={setLoginUsername}
              w={{
                base: "75%",
                md: "25%",
              }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="white"
                />
              }
              placeholder="Email"
              placeholderTextColor="white"
              color="white"
            />
            <Input
              style={styles.input}
              onChangeText={setLoginPassword}
              w={{
                base: "75%",
                md: "25%",
              }}
              type={show ? "text" : "password"}
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="white"
                  onPress={() => setShow(!show)}
                />
              }
              placeholder="Password"
              placeholderTextColor="white"
              color="white"
            />

            <Button
              p={5}
              size="lg"
              minWidth="100%"
              style={styles.button}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              Create Account
            </Button>
          </Stack>
          <Button
            p={5}
            size="lg"
            minWidth="100%"
            style={styles.signin}
            onPress={async () => {
              try {
                setLoading(true);
                await login(loginUsername, loginPassword);
              } catch (e) {
                setError("Incorrect username or password");
                setLoading(false);
              }
            }}
          >
            Sign In
          </Button>
        </NativeBaseProvider>
        <Loading loading={loading} />
      </AuthContainer>
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
    marginTop: 330,
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

export default LoginScreen;
