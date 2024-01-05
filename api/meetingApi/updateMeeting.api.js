import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (id, name, password, timeStart, timeEnd, description, memberIds, workspaceId) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");

    const response = await fetch(baseUrl + "Meeting/update/" + id, {
      method: "PUT",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
        "workspace-id": workspaceId,
      },
      body: JSON.stringify({
        "name": name,
        "password": password,
        "timeStart": timeStart,
        "timeEnd": timeEnd,
        "description": description,
        "type": 0,
        "memberIds": memberIds,
      }),
    });
    return response;
  } catch (error) {
    return error;
  }
};
