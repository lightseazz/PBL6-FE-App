import { apiKey, baseUrl } from "../constant.api";

export default async (email, username, firstName, lastName, password) => {
  try {
    const response = await fetch(baseUrl + "Auth/signup", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        FirstName: firstName,
        LastName: lastName,
        Phone: "1234567891",
        Gender: true,
        BirthDay: "2023-11-08T07:36:16.447Z",
      }),
    });
    return response.json();
  } catch (error) {
    return error;
  }
};
