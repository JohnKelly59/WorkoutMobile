import React from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../config";
import createAction from "../utils/createAction";
import sleep from "../utils/sleep";

const useAuth = () => {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            user: { ...action.payload },
          };
        case "REMOVE_USER":
          return {
            ...state,
            user: undefined,
          };
        case "SET_LOADING":
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    }
  );
  const auth = React.useMemo(
    () => ({
      login: async (loginUsername, loginPassword) => {
        const { data } = await axios.post(`${API_URL}/auth/login`, {
          email: loginUsername,
          password: loginPassword,
        });

        const user = {
          firstName: data.userData.firstName,
          id: data.userData._id,
          email: data.userData.email,
          token: data.userData.password,
        };

        await SecureStore.setItemAsync("user", JSON.stringify(user));
        dispatch(createAction("SET_USER", user));
      },

      signinAsGuest: async (loginUsername, loginPassword) => {
        const user = {
          firstName: "Guest",
          id: "Guest123",
          email: "Guest Account",
          token: "Guest456",
        };

        await SecureStore.setItemAsync("user", JSON.stringify(user));
        dispatch(createAction("SET_USER", user));
      },

      logout: async () => {
        console.log("running logout?");
        await SecureStore.deleteItemAsync("user");
        dispatch(createAction("REMOVE_USER"));
      },
      deleteUser: async (user) => {
        console.log(user);
        const deleted = await axios.post(`${API_URL}/deleteUser`, {
          email: user.email,
        });
        await SecureStore.deleteItemAsync("user");
        dispatch(createAction("REMOVE_USER"));
      },
      register: async (registerUsername, registerPassword, registerName) => {
        await sleep(2000);
        await axios.post(`${API_URL}/register`, {
          name: registerName,
          email: registerUsername,
          password: registerPassword,
        });
      },
      uploadPic: async (profileImage, user) => {
        const formData = new FormData();
        formData.append("avatar", {
          name: user.id + "_profile",
          uri: profileImage,
          type: "image/jpg",
        });

        await axios
          .post(`${API_URL}/auth/uploadPic`, formData, {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },
    }),
    []
  );

  React.useEffect(() => {
    sleep(2000).then(() => {
      SecureStore.getItemAsync("user").then((user) => {
        if (user) {
          dispatch(createAction("SET_USER", JSON.parse(user)));
        }
        dispatch(createAction("SET_LOADING", false));
      });
    });
  }, []);
  return { auth, state };
};

export default useAuth;
