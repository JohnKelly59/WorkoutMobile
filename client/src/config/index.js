import { Platform } from "react-native";
export const API_URL =
  Platform.OS === "ios" ? "http://mwafjk.com" : "http://localhost:8081";
