import * as SecureStore from "expo-secure-store";
import getUserByIdApi from "../api/userApi/getUserById.api";
export const userSignedIn = {
  id: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  picture: "",
  gender: true,
  phone: "",
  birthDay: "",
}

export function setGlobalUserSignedIn({ id, username, email, firstName, lastName, picture, gender, phone, birthDay }) {
  userSignedIn.id = id;
  userSignedIn.username = username;
  userSignedIn.email = email;
  userSignedIn.firstName = firstName;
  userSignedIn.lastName = lastName;
  userSignedIn.picture = picture;
  userSignedIn.gender = gender;
  userSignedIn.phone = phone;
  userSignedIn.birthDay = birthDay;
}
export async function setGlobalUser() {
  userId = await SecureStore.getItemAsync("userId");
  const userInformation = await getUserByIdApi(userId);
  setGlobalUserSignedIn({
    id: userInformation.id,
    username: userInformation.username,
    email: userInformation.email,
    firstName: userInformation.firstName,
    lastName: userInformation.lastName,
    picture: userInformation.picture,
    gender: userInformation.gender,
    phone: userInformation.phone,
    birthDay: userInformation.birthDay,
  });
}

export let connectionChatColleague = null

export function setConnectionChatColleague(connection) {
  connectionChatColleague = connection;
}

export let connectionChatChannel = null

export function setConnectionChatChannel(connection) {
  connectionChatChannel = connection;
}
