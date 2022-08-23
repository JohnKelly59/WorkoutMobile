import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../config";
import axios from "axios";
import { Alert, Vibration } from "react-native";
const PartnersContext = createContext();

const PartnersProvider = ({ children }) => {
  const [pic, setPic] = React.useState(null);
  const [partners, setPartners] = useState([]);
  const [partnerRequests, setPartnerRequests] = useState({});
  const [searchedPartners, setSearchedPartners] = useState({});

  const errorAlert = (error) =>
    Alert.alert("Error", error.error + ".", [
      {
        text: "OK",
        onPress: () => console.log("closed Error"),
      },
    ]);

  const successAlert = (message) => {
    console.log("whyrunning: ", message);
    Alert.alert("Success", "Request sent" + ".", [
      {
        text: "OK",
        onPress: () => console.log("closed Success"),
      },
    ]);
  };

  const acceptAlert = (message) => {
    console.log("whyrunning: ", message);
    Alert.alert("Success", "Request accepted" + ".", [
      {
        text: "OK",
        onPress: () => console.log("closed Success"),
      },
    ]);
  };

  const denyAlert = (message) => {
    console.log("whyrunning: ", message);
    Alert.alert("Success", "Request denied" + ".", [
      {
        text: "OK",
        onPress: () => console.log("closed Success"),
      },
    ]);
  };

  const removeAlert = (message) => {
    console.log("whyrunning: ", message);
    Alert.alert("Success", "Partner removed" + ".", [
      {
        text: "OK",
        onPress: () => console.log("closed Success"),
      },
    ]);
  };
  const cancelAlert = (message) => {
    console.log("cancel: ", message);
    Alert.alert("Success", "Request canceled" + ".", [
      {
        text: "OK",
        onPress: () => console.log("closed Cancel"),
      },
    ]);
  };

  const getUsers = async (email) => {
    axios
      .post(`${API_URL}/findUser`, {
        email,
      })
      .then((response) => {
        setSearchedPartners(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getPartners = async (user) => {
    console.log("herePartners");
    axios
      .post(`${API_URL}/getPartners`, {
        email: user.email,
      })
      .then((response) => {
        if (
          typeof response.data === "object" &&
          Object.keys(response.data)[0] === "error"
        ) {
          console.log("error: ", response.data);
          errorAlert(response.data);
        } else {
          console.log(response.data);
          setPartners(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getPartnerRequests = async (user) => {
    console.log(user.email);
    axios
      .post(`${API_URL}/getPartnerRequests`, {
        email: user.email,
      })
      .then((response) => {
        if (
          typeof response.data === "object" &&
          Object.keys(response.data)[0] === "error"
        ) {
          errorAlert(response.data);
        } else {
          setPartnerRequests(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removePartner = async (user, partnerRemove) => {
    console.log(partnerRemove);
    axios
      .post(`${API_URL}/removePartner`, {
        email: user.email,
        partnerRemove,
      })
      .then((response) => {
        if (
          typeof response.data === "object" &&
          Object.keys(response.data)[0] === "error"
        ) {
          console.log("error: ", response.data);
          errorAlert(response.data);
        } else {
          removeAlert(response.data);
          getPartners(user);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendPartnerRequest = async (user, partner) => {
    axios
      .post(`${API_URL}/sendPartnerRequest`, {
        user: user.email,
        partner,
      })
      .then((response) => {
        if (
          typeof response.data === "object" &&
          Object.keys(response.data)[0] === "error"
        ) {
          console.log("error: ", response.data);
          errorAlert(response.data);
        } else {
          successAlert(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const acceptPartnerRequest = async (user, partner) => {
    axios
      .post(`${API_URL}/acceptPartnerRequest`, {
        user: user.email,
        partner,
      })
      .then((response) => {
        if (
          typeof response.data === "object" &&
          Object.keys(response.data)[0] === "error"
        ) {
          console.log("error: ", response.data);
          errorAlert(response.data);
        } else {
          acceptAlert(response.data);
          getPartnerRequests(user);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const denyPartnerRequest = async (user, partner) => {
    axios
      .post(`${API_URL}/denyPartnerRequest`, {
        user: user.email,
        partner,
      })
      .then((response) => {
        if (
          typeof response.data === "object" &&
          Object.keys(response.data)[0] === "error"
        ) {
          console.log("error: ", response.data);
          errorAlert(response.data);
        } else {
          denyAlert(response.data);
          getPartnerRequests(user);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const cancelPartnerRequest = async (user, partner) => {
    console.log("user: ", user.email, "partner: ", partner);
    axios
      .post(`${API_URL}/cancelPartnerRequest`, {
        user: user.email,
        partner,
      })
      .then((response) => {
        if (
          typeof response.data === "object" &&
          Object.keys(response.data)[0] === "error"
        ) {
          errorAlert(response.data);
        } else {
          cancelAlert(response.data);
          getPartnerRequests(user);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const uploadPic = async (profileImage, user) => {
    const formData = new FormData();
    console.log(profileImage, user.id);
    formData.append("avatar", {
      name: user.id,
      uri: profileImage.uri,
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
  };
  const profilePic = async (user) => {
    await axios
      .get(`${API_URL}/auth/profilePic/${user.id}`, {
        params: { user: user.id },
      })
      .then((response) => {
        setPic(response.config.url);
        console.log(pic);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePic = async (user) => {
    await axios
      .post(`${API_URL}/auth/deleteProfilePic`, {
        userid: user.id,
      })
      .then((response) => {
        setPic(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const profilePicture = async (user) => {
    console.log(pic);
  };

  useEffect(() => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        getPartners(userData);
      }
    });
  }, []);

  return (
    <PartnersContext.Provider
      value={{
        getUsers,
        getPartners,
        removePartner,
        sendPartnerRequest,
        acceptPartnerRequest,
        denyPartnerRequest,
        getPartnerRequests,
        cancelPartnerRequest,
        partners,
        partnerRequests,
        setPartnerRequests,
        setPartners,
        searchedPartners,
        profilePic,
        profilePicture,
        uploadPic,
        deletePic,
        pic,
        setPic,
      }}
    >
      {children}
    </PartnersContext.Provider>
  );
};

export const usePartners = () => useContext(PartnersContext);

export default PartnersProvider;
