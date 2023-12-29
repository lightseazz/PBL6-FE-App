import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (offset, limit, type = 0) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl +
      `Notification?Offset=${offset}&Limit=${limit}` + (type ? `&type=${type}` : ""), {
      method: "GET",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "text/plain",
        authorization: "Bearer " + userToken,
        "Offset": offset,
        "Limit": limit,
        "type": type
      }
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
