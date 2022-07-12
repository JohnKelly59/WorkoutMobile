import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import RoundIconBtn from "./RoundIconBtn";

const LogInput = ({ visible, onClose, onSubmit, log, isEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(log.title);
      setDesc(log.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade">
      <ImageBackground
        source={require("../../public/images/ape.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Add Log</Text>
          <TextInput
            value={title}
            borderRadius={50}
            onChangeText={(text) => handleOnChangeText(text, "title")}
            placeholder="Title"
            placeholderTextColor="white"
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            multiline
            borderRadius={50}
            placeholder="Log"
            placeholderTextColor="white"
            style={[styles.input, styles.desc]}
            onChangeText={(text) => handleOnChangeText(text, "desc")}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={15}
              antIconName="check"
              onPress={handleSubmit}
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={15}
                style={{ marginLeft: 15 }}
                antIconName="close"
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 240,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#CFB53B",
    borderBottomWidth: 2,
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
    color: "white",
  },
  desc: {
    height: 200,
    color: "white",
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    padding: 20,
    color: "#CFB53B",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 35,
  },
});

export default LogInput;
