import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../config";
import axios from "axios";
const LogsContext = createContext();

const LogsProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const getLogs = async () => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        axios
          .post(`${API_URL}/log`, {
            email: userData.email,
          })
          .then((response) => {
            setLogs(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  const addLog = async (log) => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        axios
          .post(`${API_URL}/addlog`, {
            email: userData.email,
            id: log.id,
            title: log.title,
            desc: log.desc,
            time: log.time,
          })
          .then((response) => {
            getLogs();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  const removeLog = async (log) => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        axios
          .post(`${API_URL}/removeLog`, {
            email: userData.email,
            id: log,
          })
          .then((response) => {
            getLogs();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  const editLog = async (log) => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        const userData = JSON.parse(user);
        axios
          .post(`${API_URL}/editlog`, {
            email: userData.email,
            id: log.id,
            title: log.title,
            desc: log.desc,
            time: log.time,
          })
          .then((response) => {
            getLogs();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <LogsContext.Provider
      value={{ logs, setLogs, getLogs, removeLog, addLog, editLog }}
    >
      {children}
    </LogsContext.Provider>
  );
};

export const useLogs = () => useContext(LogsContext);

export default LogsProvider;
