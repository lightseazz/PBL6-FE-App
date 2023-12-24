import { apiKey, baseUrl } from "../constant.api";

export default async (refreshToken) => {
  try {
    const response = await fetch(baseUrl + `Auth/refresh-token?refreshToken=${refreshToken}`, {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
				refreshToken: refreshToken,
      },
    });
    if (response.ok) return response;
    return response.json();
  } catch (error) {
    return error;
  }
};
