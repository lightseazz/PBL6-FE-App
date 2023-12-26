import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (files) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    let formData = new FormData();
		files.forEach(file => formData.append("files", {
			uri: file.uri,
			name: file.name,
			type: file.mimeType || 'application/octet-stream',
		}))
    const response = await fetch(
      baseUrl + "file/",
      {
        method: "POST",
        headers: {
          "x-apikey": apiKey,
          "content-type": "multipart/form-data",
          accept: "application/json",
          authorization: "Bearer " + userToken,
        },
        body: formData,
      }
    );
    return response.json();
  } catch (error) {
    return error;
  }
};
