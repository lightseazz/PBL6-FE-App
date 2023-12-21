import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (toUserId, offset, limit) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl +
      `Messages/Pin?Offset=${offset}&limit=${limit}&ToUserId=${toUserId}`,
      {
        method: "GET",
        headers: {
          "x-apikey": apiKey,
          "content-type": "application/json",
          accept: "text/plain",
          authorization: "Bearer " + userToken,
          "Offset": offset,
          "Limit": limit,
          "ToUserId": toUserId,
        }
      });
    return response.json();
  } catch (error) {
    return error;
  }
};
