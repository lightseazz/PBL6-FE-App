import { apiKey, baseUrl } from "../constant.api";

export default async (Token) => {
  try {
    const response = await fetch(baseUrl + "Workspace", {
      method: "GET",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + Token,
      },
    });
    if (response.ok) return response.json();
    return response;
  } catch (error) {
    return error;
  }
};
