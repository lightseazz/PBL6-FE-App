import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (otpType, email) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl + "Auth/get-otp", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        otpType: otpType,
				email: email,
      }),
    });
    if (response.ok) return response;
    return response.json();
  } catch (error) {
    return error;
  }
};
