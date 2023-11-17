import { apiKey, baseUrl } from "../constant.api";

export default async (id) => {
  try {
    const response = await fetch(baseUrl + "Workspace/" + id, {
      method: "GET",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
    });
    if (response.ok) return response;
    return response.json();
  } catch (error) {
    return error;
  }
};
