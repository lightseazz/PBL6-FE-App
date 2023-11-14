import { apiKey, baseUrl } from "./constant.api";

export default async (email, password, otp) => {
  try {
    const response = await fetch(baseUrl + "Auth/forgot-password", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        newPassword: password,
        otp: otp,
      }),
    });
    if (response.ok) return response;
    return response.json();
  } catch (error) {
    return error;
  }
};
