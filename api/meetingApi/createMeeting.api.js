import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (name, sessionId, password, timeStart, timeEnd, description, workspaceId) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");

    const response = await fetch(baseUrl + "Meeting/createMeeting", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
        "workspace-id": workspaceId,
      },
      body: JSON.stringify({
        "name": name,
        "sessionId": sessionId,
        "password": password,
        "timeStart": timeStart,
        "timeEnd": timeEnd,
        "description": description,
				"workspaceId": workspaceId,

      }),
    });
    return response;
  } catch (error) {
    return error;
  }
};
