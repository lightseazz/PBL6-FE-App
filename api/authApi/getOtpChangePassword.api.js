import { apiKey, baseUrl } from "../constant.api";

export default async (otpType, email) => {
  try {
    const response = await fetch(baseUrl + "Auth/get-otp", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
        otpType: 0,
				email: 
      }),
    });
    if (response.ok) return response;
    return response.json();
  } catch (error) {
    return error;
  }
};
