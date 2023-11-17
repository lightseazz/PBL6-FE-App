import { apiKey, baseUrl } from "../constant.api";

export default async (Token, otp) => {
  try {
    const response = await fetch(baseUrl + "Auth/verify-register", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
        authorization: "Bearer " + Token,
      },
      body: JSON.stringify({
        otp: otp,
      }),
    });
    if (response.ok) return response;
    return response.json();
  } catch (error) {
    return error;
  }
};
