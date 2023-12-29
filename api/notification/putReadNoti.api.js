import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (id) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl +
      `Notification/${id}`, {
      method: "PUT",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "text/plain",
        authorization: "Bearer " + userToken,
        "id": id,
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};
