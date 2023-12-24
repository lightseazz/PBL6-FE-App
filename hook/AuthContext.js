import { createContext } from "react";
import signInApi from "../api/authApi/signIn.api";
import * as SecureStore from "expo-secure-store";
import getUserByIdApi from "../api/userApi/getUserById.api";
import { setGlobalUserSignedIn } from "../globalVar/global";
// import { OneSignal } from "react-native-onesignal";

export const AuthContext = createContext();

export function authFunctions(dispatch) {
  return () => ({
    signIn: async ({ username, password }) => {
      dispatch({ type: "LOADING" });

      const response = await signInApi(username, password);

      if (!response.token) {
        dispatch({ type: "SIGN_OUT" });
        alert("Username or Password is incorrect");
        return;
      }

      await SecureStore.setItemAsync("userToken", response.token);
			await SecureStore.setItemAsync("userId", response.userId);
			await SecureStore.setItemAsync("refreshToken", response.refreshToken);
			await SecureStore.setItemAsync("tokenTimeOut", response.tokenTimeOut);
			// // onesignal
			// OneSignal.login(response.userId);

			const userInformation = await getUserByIdApi(response.userId);
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

      dispatch({ type: "SIGN_IN", token: response.token });
    },
    signOut: async () => {
      await SecureStore.deleteItemAsync("userToken");
			// // onesignal
			// OneSignal.logout();
      dispatch({ type: "SIGN_OUT" });
    },
  });
}
