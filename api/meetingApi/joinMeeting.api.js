import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (workspaceId, sessionId, password) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl + "Meeting/join" , {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
        // "workspaceid": workspaceId,
        "workspace-id": workspaceId,
      },
      body: JSON.stringify({
        sessionId: sessionId,
        password: password,
      }),
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
