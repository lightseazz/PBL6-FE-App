import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (name, description, workspaceId) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");

    const response = await fetch(baseUrl + "Channel", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
        "workspace-id": workspaceId,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        workspaceId: workspaceId,
      }),
    });
    return response;
  } catch (error) {
    return error;
  }
};
