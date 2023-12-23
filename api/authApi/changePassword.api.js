import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (currentPassword, newPassword, otp) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl + "Auth/change-password", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
        otp: otp,
      }),
    });
    if (response.ok) return response;
    return response.json();
  } catch (error) {
    return error;
  }
};
