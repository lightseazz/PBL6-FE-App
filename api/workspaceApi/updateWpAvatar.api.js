import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (workspaceId, imageUri) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const image = {
      uri: imageUri,
      name: "image.jpg",
      type: "image/jpeg",
    };
    let formData = new FormData();
    formData.append("Avatar", image);
    const response = await fetch(
      baseUrl + "Workspace/" + workspaceId + "/avatar",
      {
        method: "PUT",
        headers: {
          "x-apikey": apiKey,
          "content-type": "multipart/form-data",
          accept: "application/json",
          authorization: "Bearer " + userToken,
          "workspaceid": workspaceId,
          "workspace-id": workspaceId,
        },
        body: formData,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
