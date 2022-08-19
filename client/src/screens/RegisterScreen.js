import React from "react";
import Error from "../components/Error";
import AuthContainer from "../components/AuthContainer";
import AuthContext from "../contexts/AuthContext";
import Loading from "../components/Loading";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {
  Text,
  Input,
  Icon,
  Stack,
  Center,
  NativeBaseProvider,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const { register } = React.useContext(AuthContext);
  const [registerName, setRegisterName] = React.useState(null);
  const [registerUsername, setRegisterUsername] = React.useState(null);
  const [registerPassword, setRegisterPassword] = React.useState(null);
  const [confirmRegisterPassword, setConfirmRegisterPassword] =
    React.useState(null);
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const registerNewUser = async (
    registerUsername,
    registerPassword,
    confirmRegisterPassword,
    registerName
  ) => {
    if (registerPassword != confirmRegisterPassword) {
      setPasswordError(true);
    } else {
      try {
        setLoading(true);
        await register(registerUsername, registerPassword, registerName);
        navigation.pop();
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <AuthContainer>
          <NativeBaseProvider>
            <Stack
              space={1}
              w="100%"
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Error error={error} />
              <Input
                style={styles.input}
                onChangeText={setRegisterName}
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
                placeholder="Name"
                placeholderTextColor="white"
                color="white"
              />
              <Input
                style={styles.input}
                onChangeText={setRegisterUsername}
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
                onChangeText={setRegisterPassword}
                onPress={() => setPasswordError(false)}
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
              <Input
                style={styles.input}
                onChangeText={setConfirmRegisterPassword}
                onPress={() => setPasswordError(false)}
                w={{
                  base: "75%",
                  md: "25%",
                }}
                type={show2 ? "text" : "password"}
                InputRightElement={
                  <Icon
                    as={
                      <MaterialIcons
                        name={show2 ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="white"
                    onPress={() => setShow2(!show)}
                  />
                }
                placeholder=" Confirm Password"
                placeholderTextColor="white"
                color="white"
              />

              {passwordError ? <Text>Passwords do not match</Text> : null}
            </Stack>
            <Button
              p={5}
              size="lg"
              style={styles.button}
              onPress={() =>
                registerNewUser(
                  registerUsername,
                  registerPassword,
                  confirmRegisterPassword,
                  registerName
                )
              }
            >
              Register
            </Button>
            <Button
              p={5}
              size="lg"
              style={styles.back}
              onPress={() => navigation.goBack()}
            >
              Go Back
            </Button>
          </NativeBaseProvider>
          <Loading loading={loading} />
        </AuthContainer>
      </KeyboardAvoidingView>
    </ScrollView>
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
    marginTop: 140,
    backgroundColor: "#CFB53B",
    borderRadius: 0,
  },
  back: {
    marginTop: 0,
    backgroundColor: "#CFB53B",
    borderRadius: 0,
  },
});

export default RegisterScreen;
