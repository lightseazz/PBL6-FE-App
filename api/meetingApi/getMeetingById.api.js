import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (id) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl +
      `Meeting/getMeeting/${id}`, {
      method: "GET",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "text/plain",
        authorization: "Bearer " + userToken,
      }
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
