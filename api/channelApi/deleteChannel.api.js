import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (workspaceId, channelId) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl + "Channel/" + channelId, {
      method: "DELETE",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
        "channel-id": channelId,
        "workspace-id": workspaceId,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
