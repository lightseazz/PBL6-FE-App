import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (workspaceId, email) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const response = await fetch(baseUrl + "Workspace/"+workspaceId+"/members", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + userToken,
				"workspace-id": workspaceId,
        "workspaceid": workspaceId,
      },
      body: JSON.stringify(email),
    });
    return response;
  } catch (error) {
    return error;
  }
};
