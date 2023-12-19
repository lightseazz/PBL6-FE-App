import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (timeCursor, count, parentId, toChannelId) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl +
      `Messages?TimeCursor=${timeCursor}&Count=${count}&ParentId=${parentId}&ToChannelId=${toChannelId}`,
      {
        method: "GET",
        headers: {
          "x-apikey": apiKey,
          "content-type": "application/json",
          accept: "text/plain",
          authorization: "Bearer " + userToken,
          "TimeCursor": timeCursor,
          "Count": count,
          "ToChannelId": toChannelId,
        }
      });
    return response.json();
  } catch (error) {
    return error;
  }
};
