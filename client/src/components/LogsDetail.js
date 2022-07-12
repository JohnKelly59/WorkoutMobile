import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import RoundIconBtn from "./RoundIconBtn";

import { useLogs } from "../contexts/LogsContext";
import LogInput from "./LogInput";

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const LogsDetail = (props) => {
  const [log, setLog] = useState(props.route.params.log);
  const { editLog, removeLog } = useLogs();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteLog = async () => {
    removeLog(log.id);
    props.navigation.navigate("LogsScreen");
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are You Sure!",
      "This action will delete your log permanently!",
      [
        {
          text: "Delete",
          onPress: deleteLog,
        },
        {
          text: "No Thanks",
          onPress: () => console.log("no thanks"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    if (log.id) {
      const newlog = {
        id: log.id,
        title,
        desc,
        time,
      };

      await editLog(newlog);
      props.navigation.navigate("LogsScreen");
    }
  };

  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container]}>
        <Text style={styles.time}>{`Created At ${formatDate(log.time)}`}</Text>
        <Text style={styles.title}>{log.title}</Text>
        <Text style={styles.desc}>{log.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName="delete"
          style={{ marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn antIconName="edit" onPress={openEditModal} />
      </View>
      <LogInput
        isEdit={isEdit}
        log={log}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  title: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  desc: {
    paddingTop: 5,
    fontSize: 20,
    opacity: 0.6,
    color: "white",
    textAlign: "center",
  },
  time: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    opacity: 0.5,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
});

export default LogsDetail;
