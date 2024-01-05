import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";
import refreshTokenApi from "../authApi/refreshToken.api";

export default async (workspaceId) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");

    const response = await fetch(baseUrl + "Meeting/getMeetings?workspaceId="+workspaceId, {
      method: "GET",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
				"workspace-id": workspaceId,
      },
    });
    if (response.ok) return response.json();
    return response;
  } catch (error) {
    return error;
  }
};
