import { apiKey, baseUrl } from "../constant.api";

export default async (username, password) => {
  try {
    const response = await fetch(baseUrl + "Auth/signin", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.ok) return response.json();
    return response;
  } catch (error) {
    return error;
  }
};
