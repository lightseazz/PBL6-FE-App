import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";
import refreshTokenApi from "../authApi/refreshToken.api";

export default async () => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    const response = await fetch(baseUrl + "Workspace", {
      method: "GET",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
      },
    });
    if (response.ok) return response.json();
    return response;
  } catch (error) {
    return error;
  }
};
