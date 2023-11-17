import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (id) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl + "Workspace?workspaceId=" + id, {
      method: "DELETE",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
      },
    });
    if (response.ok) return response;
    return response.json();
  } catch (error) {
    return error;
  }
};
