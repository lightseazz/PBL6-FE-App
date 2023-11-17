import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (name, description, imageUri) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    const image = {
      uri: imageUri,
      name: "image.jpg",
      type: "image/jpeg",
    };
    let formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Avatar", image);
    const response = await fetch(baseUrl + "Workspace", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "multipart/form-data",
        accept: "application/json",
        authorization: "Bearer " + userToken,
      },
      body: formData,
    });
    console.log(response.status);
    return response;
  } catch (error) {
    return error;
  }
};
