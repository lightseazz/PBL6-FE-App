import { apiKey, baseUrl } from "../constant.api";
import * as SecureStore from "expo-secure-store";

export default async (userId, firstName, lastName, gender, phone, email, birthDay) => {
  try {
    const userToken = await SecureStore.getItemAsync("userToken");
    var formdata = new FormData();
    formdata.append("FirstName", firstName);
    formdata.append("LastName", lastName);
    formdata.append("Gender", gender);
    formdata.append("Phone", phone);
    formdata.append("Email", email);
    formdata.append("BirthDay", birthDay);
    const response = await fetch(
      baseUrl + "User/" + userId,
      {
        method: "PUT",
        headers: {
          "x-apikey": apiKey,
          accept: "text/plain",
          authorization: "Bearer " + userToken,
        },
        body: formdata,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
