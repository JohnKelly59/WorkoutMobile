import { Platform } from "react-native";
export const API_URL =
  Platform.OS === "ios" ? "http://192.168.1.138:8081" : "http://localhost:8081";

//"http://192.168.1.96:8081"
