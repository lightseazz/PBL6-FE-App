import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (channelId, userIds) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl + "Channel/"+channelId+"/members", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
				// "workspace-id": workspaceId,
				"channel-id": channelId,
      },
      body: JSON.stringify(userIds),
    });
    return response;
  } catch (error) {
    return error;
  }
};
