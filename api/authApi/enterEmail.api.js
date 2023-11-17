import { apiKey, baseUrl } from "../constant.api";

export default async (email) => {
  try {
    const response = await fetch(baseUrl + "Auth/get-otp", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        otpType: 3,
        email: email,
      }),
    });
    if (response.ok) return response;
    return response.json();
  } catch (error) {
    return error;
  }
};
